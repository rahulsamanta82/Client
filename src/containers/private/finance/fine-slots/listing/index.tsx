import { FC, Fragment, useEffect, useState } from "react";
import { FSListingSection, FSListingMain, FSListingTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "../../useHooks";
import { FineSlotDTO } from "utils/helpers/models/finance/fine-slot.dto";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";

interface FineSlotsListingProps { }

const FineSlotsListing: FC<FineSlotsListingProps> = ({ }) => {
    const navigate = useNavigate();
    const { getFineSlots, deleteFineSlot } = useFinance();
    const [data, setData] = useState<FineSlotDTO[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const columns: string[] = [
        "Application",
        "Semester",
        "Year",
        "Fine Slot Title",
        "Start Date",
        "End Date",
        "Fine",
        "Re-Instate Fee",
        "Action"
    ]

    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    const goToCreateFineSlot = () => {
        navigate(siteRoutes.createFineSlot);
    }

    useEffect(() => {
        getAllFineSlots(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteFineSlot(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllFineSlots(page + 1, search);
    };
    const getAllFineSlots = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getFineSlots(setData, queryParams, setPagination);
    };

    const goToEditFineSlot = (id: number) => {
        navigate(`${siteRoutes.createFineSlot}?id=${id}`);
    }

    return (
        <FSListingMain>
            <FSListingTop>
                <div className="left">
                    <span className="page-heading">Fine slots</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createFineSlot) && (
                        <div className="create-fine-slot-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateFineSlot}>
                                + Add Fine Slot
                            </button>
                        </div>
                    )}
                </div>
            </FSListingTop>

            <FSListingSection className="content-radius-shadow">
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
                                handleSearchChange(e, setSearch, getAllFineSlots)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllFineSlots)}
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
                            {data.map((fineSlot, index) => {
                                return <tr key={index}>
                                    <td>{fineSlot.application.title}</td>
                                    <td>{fineSlot.semester}</td>
                                    <td>20{fineSlot.year}</td>
                                    <td>{fineSlot.title}</td>
                                    <td>{fineSlot.start_date}</td>
                                    <td>{fineSlot.end_date}</td>
                                    <td>{fineSlot.late_fee_fine}</td>
                                    <td>{fineSlot.reinstate_fine}</td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon" onClick={() => goToEditFineSlot(fineSlot.id)}>
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(fineSlot.id)}>
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
                    <Pagination {...pagination} onPageChange={onPageChange} />
                </Fragment>
            </FSListingSection>
        </FSListingMain>
    )
}

export default FineSlotsListing;