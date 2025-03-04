import { FC, Fragment, useEffect, useState } from "react";
import { VoucherTypeListingSection, VoucherTypeListingMain, VoucherTypeListingTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "../../useHooks";
import { VoucherTypeDTO } from "utils/helpers/models/finance/voucher-type.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

interface VoucherTypesListingProps { }

const VoucherTypesListing: FC<VoucherTypesListingProps> = ({ }) => {
    const navigate = useNavigate();
    const { getVoucherTypes, deleteVoucherType } = useFinance();
    const [data, setData] = useState<VoucherTypeDTO[]>([]);
    const { handleSearchChange, handleTableSearch } = useUtils();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const columns: string[] = [
        "Title",
        "Account Code",
        "Action",
    ]

    const { hasAccess } = useStore();

    const goToCreateVoucher = () => {
        navigate(siteRoutes.createVoucherType);
    }

    useEffect(() => {
        getAllVoucherTypes(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteVoucherType(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllVoucherTypes(page + 1, search);
    };
    const getAllVoucherTypes = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getVoucherTypes(setData, queryParams, setPagination);
    };

    const goToEditVoucherType = (id: number) => {
        navigate(`${siteRoutes.createVoucherType}?id=${id}`);
    }
    return (
        <VoucherTypeListingMain>
            <VoucherTypeListingTop>
                <div className="left">
                    <span className="page-heading">Voucher Types</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createVoucherType) && (
                        <div className="create-fine-slot-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateVoucher}>
                                + Add Voucher Type
                            </button>
                        </div>
                    )}
                </div>
            </VoucherTypeListingTop>

            <VoucherTypeListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>
                        <div className="export-btn">
                            <span>
                                <ExcelSvg className="icon" />
                            </span>
                            <span className="text">Excel</span>
                        </div>
                    </div>
                    <div className="table-search-field">
                        <span className="search-icon">
                            <SearchFieldSvg className="icon" />
                        </span>
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) =>
                                handleSearchChange(e, setSearch, getAllVoucherTypes)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllVoucherTypes)}
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((voucherType, index) => {
                                return <tr key={index}>
                                    <td>{voucherType.title}</td>
                                    <td>{voucherType.acc_code}</td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon" onClick={() => goToEditVoucherType(voucherType.id)}>
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(voucherType.id)}>
                                                <DeleteTableSvg />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </VoucherTypeListingSection>
        </VoucherTypeListingMain>
    )
}

export default VoucherTypesListing;