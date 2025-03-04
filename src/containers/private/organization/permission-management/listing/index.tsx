import { FC, Fragment, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
    PermissionManagementListingMain,
    PermissionManagementListingTop,
    PermissionManagementListings,
    PermissionManagementListingSection,
} from "./style";
import {
    EditTableSvg,
    DeleteTableSvg,
    SearchFieldSvg,
    ExcelSvg,
    PdfSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useOrganization from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import Pagination from "components/particles/table/pagination";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useUtils from "hooks/useUtils";
interface AdmissionStudentListingProps { }
const PermissionManagementListing: FC<AdmissionStudentListingProps> = ({ }) => {
    const [data, setData] = useState<any>({});
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { handleSearchChange, handleTableSearch } = useUtils();
    const { getPermissions, deletePermission } = useOrganization();
    const columns: string[] = ["Module Name", "Permissions", "Actions"];
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(siteRoutes.permissionManagementCreate);
    };

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deletePermission(id, setData, queryParams, setPagination);
        }
    };
    useEffect(() => {
        getAllPermissions(pagination.page, search);
    }, []);

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllPermissions(page + 1, search);
    };

    const getAllPermissions = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getPermissions(setData, queryParams, setPagination);
    };

    const { hasAccess } = useStore();

    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    return (
        <PermissionManagementListingMain>
            <PermissionManagementListingTop>
                <div className="left">
                    <span className="page-heading">Permission Management</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="submit-buttons">
                        {hasAccess(sitePermissions.permissionManagementCreate) && (
                            <button className="lg-rounded-btn" onClick={handleClick}>
                                + Create New Permissions
                            </button>
                        )}
                    </div>
                </div>
            </PermissionManagementListingTop>
            <PermissionManagementListingSection className="content-radius-shadow">
                <PermissionManagementListings>
                    <div className="flex">
                        <div className="table-data-export-buttons">
                            {hasAccess(sitePermissions.permissionManagementPDFDownload) && (
                                <div className="export-btn">
                                    <span>
                                        <PdfSvg className="icon" />
                                    </span>
                                    <span className="text">PDF</span>
                                </div>
                            )}
                            {hasAccess(sitePermissions.permissionManagementExcelDownload) && (
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
                                onChange={(e) => handleSearchChange(e, setSearch, getAllPermissions)}
                                onKeyUp={e => handleTableSearch(e, getAllPermissions)}
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
                                {Object.entries(data).map(
                                    ([key, value]: any[], index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td valign="top">
                                                    <div className="module-name">{key}</div>
                                                </td>
                                                <td>
                                                    <div className="permissions">
                                                        {value.length &&
                                                            value.map((permission: any, index: number) => {
                                                                return (
                                                                    <span key={index}>{permission.name}</span>
                                                                );
                                                            })}
                                                    </div>
                                                </td>
                                                <td>
                                                    {hasAccess(
                                                        sitePermissions.permissionManagementDelete
                                                    ) && (
                                                            <div className="permissions-actions">
                                                                {value?.length &&
                                                                    value.map((permission: any, index: number) => {
                                                                        return (
                                                                            <div
                                                                                className="action-icon cp"
                                                                                key={index}
                                                                                onClick={() =>
                                                                                    handleDelete(permission.id)
                                                                                }
                                                                            >
                                                                                <DeleteTableSvg />
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                        )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </PermissionManagementListings>
                <Fragment>
                    <DataNotFound show={!isLoading && !Object.keys(data)?.length} />
                    <Pagination {...pagination} onPageChange={onPageChange} />
                </Fragment>
            </PermissionManagementListingSection>
        </PermissionManagementListingMain>
    );
};
export default PermissionManagementListing;
