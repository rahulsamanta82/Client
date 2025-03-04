import { FC, Fragment, useEffect, useState } from "react";
import {
    AdmissionManageQuotasListingMain,
    AdmissionManageQuotasListingSection,
    AdmissionManageQuotasListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAdmissions from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AdmissionManageQuotasListingProps { }

const AdmissionManageQuotasListing: FC<AdmissionManageQuotasListingProps> = () => {
    const columns: string[] = ["Title", "Additional Info", "Status", "Action"];
    const [search, setSearch] = useState("");
    const [data, setData] = useState<any[]>([]);
    const { getAdmissionQuotas, deleteAdmissionQuota } = useAdmissions();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const { handleSearchChange, handleTableSearch } = useUtils();
    const { hasAccess } = useStore();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });

    const navigate = useNavigate();

    const goToCreateQuota = () => {
        navigate(siteRoutes.createAdmissionQuotas);
    };

    const getAllQuotas = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getAdmissionQuotas(setData, queryParams, setPagination);
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllQuotas(page + 1, search);
    };

    useEffect(() => {
        getAllQuotas(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                per_page: pagination.per_page,
                page: 1,
            };
            deleteAdmissionQuota(id, setData, queryParams, setPagination);
        }
    };

    const goToEditQuota = (id: number) => {
        navigate(`${siteRoutes.createAdmissionQuotas}?id=${id}`);
    };
    return (
        <AdmissionManageQuotasListingMain>
            <AdmissionManageQuotasListingTop>
                <div className="left">
                    <span className="page-heading">Manage Quotas</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createAdmissionQuotas) && (
                        <div className="add-new-button">
                            <button className="lg-rounded-btn" onClick={goToCreateQuota}>
                                + Add New
                            </button>
                        </div>
                    )}
                </div>
            </AdmissionManageQuotasListingTop>

            <AdmissionManageQuotasListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAdmissionQuotaPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}

                        {hasAccess(sitePermissions.downloadAdmissionQuotaExcel) && (
                            <div className="export-btn">
                                <span>
                                    <ExcelSvg className="icon" />
                                </span>
                                <span className="text">Excel</span>
                            </div>
                        )}
                    </div>
                    <div className="table-search-field">
                        <span className="search-icon">
                            <SearchFieldSvg className="icon" />
                        </span>
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => handleSearchChange(e, setSearch, getAllQuotas)}
                            onKeyUp={(e) => handleTableSearch(e, getAllQuotas)}
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">{item.title}</div>
                                        </td>
                                        <td>{item?.additional_info ? "Yes" : "No"}</td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <label htmlFor={`is-active-yes-${index}`}>
                                                        Active
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`is-active-${index}`}
                                                        id={`is-active-yes-${index}`}
                                                        checked={item?.is_active}
                                                    />
                                                </div>
                                                <div className="radio">
                                                    <label htmlFor={`is-active-no-${index}`}>
                                                        Deactivate
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`is-active-${index}`}
                                                        id={`is-active-no-${index}`}
                                                        checked={!item?.is_active}
                                                    />
                                                </div>
                                            </div>{" "}
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.editAdmissionQuotas) && (
                                                    <div
                                                        className="action-icon"
                                                        onClick={() => goToEditQuota(item.id)}
                                                    >
                                                        <EditTableSvg />
                                                    </div>
                                                )}
                                                {hasAccess(sitePermissions.deleteAdmissionQuotas) && (
                                                    <div
                                                        className="action-icon"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <DeleteTableSvg />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination {...pagination} onPageChange={onPageChange} />
                </Fragment>
            </AdmissionManageQuotasListingSection>
        </AdmissionManageQuotasListingMain>
    );
};

export default AdmissionManageQuotasListing;
