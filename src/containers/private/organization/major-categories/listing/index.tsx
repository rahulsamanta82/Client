import { FC, useEffect, useState } from "react";
import {
    MajorCategoriesListingMain,
    MajorCategoriesListingSection,
    MajorCategoriesListingTop,
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
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAdmissions from "containers/private/admissions/useHooks";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AdmissionManageQuotasListingProps { }

const MajorCategoriesListing: FC<AdmissionManageQuotasListingProps> = () => {
    const columns: string[] = ["Title", "Status", "Action"];
    const [search, setSearch] = useState("");
    const [data, setData] = useState<any[]>([]);
    const { getAdmissionQuotas, deleteAdmissionQuota } = useAdmissions();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });

    const navigate = useNavigate();
    const { hasAccess } = useStore();

    const goToCreateMajorCategories = () => {
        navigate(siteRoutes.CreateMajorCategories);
    };

    const getAllQuotas = (page: number = 1) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getAdmissionQuotas(setData, queryParams, setPagination);
    };

    const handleSearch = (event: any) => {
        if (event.key === "Enter") {
            getAllQuotas();
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllQuotas(page + 1);
    };

    useEffect(() => {
        getAllQuotas();
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
        <MajorCategoriesListingMain>
            <MajorCategoriesListingTop>
                <div className="left">
                    <span className="page-heading">Major Categories</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button
                            className="lg-rounded-btn"
                            onClick={goToCreateMajorCategories}
                        >
                            + Add New
                        </button>
                    </div>
                </div>
            </MajorCategoriesListingTop>

            <MajorCategoriesListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAssetsMajorCategoriesPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.downloadAssetsMajorCategoriesExcel) && (
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
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyUp={handleSearch}
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
                                                {hasAccess(
                                                    sitePermissions.editAssetsMajorCategories
                                                ) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => goToEditQuota(item.id)}
                                                        >
                                                            <EditTableSvg />
                                                        </div>
                                                    )}
                                                {hasAccess(
                                                    sitePermissions.deleteAssetsMajorCategories
                                                ) && (
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
                <Pagination {...pagination} onPageChange={onPageChange} />
            </MajorCategoriesListingSection>
        </MajorCategoriesListingMain>
    );
};

export default MajorCategoriesListing;
