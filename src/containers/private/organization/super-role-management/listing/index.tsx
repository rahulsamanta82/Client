import { FC, Fragment, useEffect } from "react";
import {
    SuperRoleManagementListingSection,
    SuperRoleManagementListingMain,
    SuperRoleManagementListingTop,
} from "./style";
import { useState } from "react";
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
import Breadcrumb from "components/particles/breadcrumb";
import useOrganization from "../../useHooks";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useUtils from "hooks/useUtils";

const RoleManagementListing: FC = () => {
    const columns: string[] = ["Names", "Status", "Action"];
    const { hasAccess } = useStore();

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const { getRolesBySuperAdmin, deleteRoleBySuperAdmin } = useOrganization();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const { handleSearchChange, handleTableSearch } = useUtils();

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllRoles(page + 1, search);
    };
    const getAllRoles = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getRolesBySuperAdmin(setData, queryParams, setPagination);
    };
    const navigate = useNavigate();

    useEffect(() => {
        getAllRoles(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteRoleBySuperAdmin(id, setData, queryParams, setPagination);
        }
    };

    const goToEditRole = (id: number) => {
        navigate(`${siteRoutes.superRoleManagementCreate}?id=${id}`);
    };

    const goToCreateResultType = () => {
        navigate(siteRoutes.superRoleManagementCreate);
    };

    return (
        <SuperRoleManagementListingMain>
            <SuperRoleManagementListingTop>
                <div className="left">
                    <span className="page-heading">Role Management</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.superRoleManagementCreate) && (
                        <div className="create-org-btn">
                            <button
                                className="lg-rounded-btn"
                                type="button"
                                onClick={goToCreateResultType}
                            >
                                + Create New Role
                            </button>
                        </div>
                    )}
                </div>
            </SuperRoleManagementListingTop>

            <SuperRoleManagementListingSection className="content-radius-shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.superRoleManagementPDFDownload) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.superRoleManagementExcelDownload) && (
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllRoles)}
                            onKeyUp={e => handleTableSearch(e, getAllRoles)}
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
                            {data?.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.name}</td>
                                        <td>
                                            {item?.status ? (
                                                <span className="status-tile green">Active</span>
                                            ) : (
                                                <span className="status-tile red">Inactive</span>
                                            )}
                                        </td>

                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.superRoleManagementEdit) && (
                                                    <div
                                                        className="action-icon"
                                                        onClick={() => goToEditRole(item?.id)}
                                                    >
                                                        <EditTableSvg />
                                                    </div>
                                                )}

                                                {hasAccess(
                                                    sitePermissions.superRoleManagementDelete
                                                ) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => handleDelete(item?.id)}
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
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </SuperRoleManagementListingSection>
        </SuperRoleManagementListingMain>
    );
};

export default RoleManagementListing;
