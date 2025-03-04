import { FC, Fragment, useEffect, useState } from "react";
import {
    SuperAdminManagementListingMain,
    SuperAdminManagementListingSection,
    SuperAdminManagementListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
    TableGreenEyeSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { DropdownMain } from "components/particles/forms/multiselect-dropdown/style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useOrganization from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useUtils from "hooks/useUtils";

interface AdmissionDocumentsMasterListingProps { }

const SubjectManagementListing: FC<AdmissionDocumentsMasterListingProps> = () => {
    const columns: string[] = ["Name", "Email", "Status", "Role", "Action"];
    const { getSuperAdmins, deleteSuperAdmin } = useOrganization();
    const [search, setSearch] = useState("");
    const [data, setData] = useState<any[]>([]);

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const navigate = useNavigate();
    const { handleSearchChange, handleTableSearch } = useUtils();

    const goToCreateSuperAdmin = () => {
        navigate(siteRoutes.superAdminManagementCreate);
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllSuperAdmins(page + 1, search);
    };
    const getAllSuperAdmins = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getSuperAdmins(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllSuperAdmins(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteSuperAdmin(id, setData, queryParams, setPagination);
        }
    };

    const goToEditSuperAdmin = (id: number) => {
        navigate(`${siteRoutes.superAdminManagementCreate}?id=${id}`);
    };

    const { hasAccess } = useStore();
    return (
        <SuperAdminManagementListingMain>
            <SuperAdminManagementListingTop>
                <div className="left">
                    <span className="page-heading">Super Admins</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.superAdminManagementCreate) && (
                        <div className="add-new-button">
                            <button className="lg-rounded-btn" onClick={goToCreateSuperAdmin}>
                                + Create New Super Admins
                            </button>
                        </div>
                    )}
                </div>
            </SuperAdminManagementListingTop>

            <SuperAdminManagementListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.superAdminManagementPDFDownload) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}

                        {hasAccess(sitePermissions.superAdminManagementExcelDownload) && (
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllSuperAdmins)}
                            onKeyUp={e => handleTableSearch(e, getAllSuperAdmins)}
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
                                            <div className="mw-150">{item?.name}</div>
                                        </td>
                                        <td>{item?.email}</td>
                                        <td>
                                            {item?.status ? (
                                                <span className="status-tile green">Active</span>
                                            ) : (
                                                <span className="status-tile yellow">Inactive</span>
                                            )}
                                        </td>
                                        <td>{item?.role?.name}</td>

                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(
                                                    sitePermissions.superAdminManagementEdit
                                                ) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => goToEditSuperAdmin(item?.id)}
                                                        >
                                                            <EditTableSvg />
                                                        </div>
                                                    )}
                                                {hasAccess(
                                                    sitePermissions.superAdminManagementShow
                                                ) && (
                                                        <div className="action-icon">
                                                            <TableGreenEyeSvg />
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

                <div>
                    <DropdownMain />
                </div>
                <Fragment>
                    <Pagination {...pagination} onPageChange={onPageChange} />
                </Fragment>
            </SuperAdminManagementListingSection>
        </SuperAdminManagementListingMain>
    );
};

export default SubjectManagementListing;
