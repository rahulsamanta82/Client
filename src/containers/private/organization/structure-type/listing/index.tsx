import { FC, Fragment, useEffect, useState } from "react";
import { Main, STListingSection, STListingTop } from "./style";
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
import useOrganization from "../../useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum"; import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

interface StructureTypeListingProps { }

const StructureTypeListing: FC<StructureTypeListingProps> = () => {
    const breadcrumbLinks = [
        {
            title: "Organization /",
            path: "/private/organization/org/organization-listing",
        },
        {
            title: "Structure Types",
            path: "/private/organization/structure-types/structure-types-listing",
        },
    ]
    let [columns, setColumns] = useState<string[]>([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { getQueryParams, handleSearchChange, handleTableSearch } = useUtils();
    const params = getQueryParams();
    const [data, setData] = useState<any[]>([]);
    const { hasAccess, isSuperAdmin, getOrganization } = useStore();
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const {
        getStructureTypesSuperAdmin,
        getStructureTypesAdmin,
        deleteStructureTypeAdmin,
        deleteStructureTypeSuperAdmin,
        downloadStructureTypesExcelFileByAdmin,
        downloadStructureTypesExcelFileBySuperAdmin,
        downloadStructureTypesPdfFileByAdmin,
        downloadStructureTypesPdfFileBySuperAdmin,
    } = useOrganization();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const currentOrganization = getOrganization();

    const goToCreateOrg = () => {
        if (params?.organizationId) {
            navigate(
                `${siteRoutes.createStructureType}?organizationId=${params?.organizationId}`
            );
        } else {
            navigate(siteRoutes.createStructureType);
        }
    };
    const handleDelete = async (id: number) => {
        const result = await confirmationPopup();
        if (result.isConfirmed) {
            if (params?.organizationId) {
                deleteStructureTypeSuperAdmin(
                    params?.organizationId,
                    id,
                    setData,
                    pagination,
                    setPagination
                );
            }
            deleteStructureTypeAdmin(id, setData, pagination, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllStructureTypes(page + 1, search);
    };

    const getAllStructureTypes = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        if (params?.organizationId || isSuperAdmin()) {
            getStructureTypesSuperAdmin(
                params?.organizationId,
                setData,
                queryParams,
                setPagination,
                search
            );
        } else {
            getStructureTypesAdmin(setData, queryParams, setPagination);
        }
    };

    const goToUpdateStructureType = (structureTypeId: number) => {
        navigate(
            `${siteRoutes.createStructureType}?structureTypeId=${structureTypeId}`
        );
    };

    const handleDownloadExcelList = () => {
        if (params?.organizationId) {
            downloadStructureTypesExcelFileBySuperAdmin();
        } else {
            downloadStructureTypesExcelFileByAdmin();
        }
    };

    const handleDownloadPdfList = () => {
        if (params?.organizationId) {
            downloadStructureTypesPdfFileBySuperAdmin();
        } else {
            downloadStructureTypesPdfFileByAdmin();
        }
    };

    useEffect(() => {
        if (isSuperAdmin() && !params?.organizationId) {
            columns = [
                "Organization Name",
                "Name",
                "Slug",
                "Status",
                "Allow Admin",
                "Action",
            ];
        } else {
            columns = ["Name", "Slug", "Status", "Action"];
        }

        setColumns([...columns]);
        getAllStructureTypes(pagination.page, search);
    }, [params?.organizationId]);

    return (
        <Main>
            <STListingTop>
                <div className="left">
                    <span className="page-heading">Structure Types</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    {isSuperAdmin() && (hasAccess(sitePermissions.createStructureType) && !(isSuperAdmin() && !params?.organizationId)) ? (
                        <div className="create-org-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateOrg}>
                                + Add Structure Type
                            </button>
                        </div>
                    ) : ''}

                    {!isSuperAdmin() && (hasAccess(sitePermissions.createStructureType) && currentOrganization?.add_structure_type) ? (
                        <div className="create-org-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateOrg}>
                                + Add Structure Type
                            </button>
                        </div>
                    ) : ''}
                </div>
            </STListingTop>

            <STListingSection className="content-radius-shadow">
                <div className="list-detail">
                    <div className="page-sub-heading">
                        <span>Structure Types</span>
                    </div>
                    <div className="description">
                        <div className="text">
                            Lorem ipsum is placeholder text commonly used in the graphic,
                            print, and publishing industries for previewing layouts and visual
                            mockups.
                            <span className="link-text"> More Info</span>
                        </div>
                    </div>
                </div>
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadStructureTypesListPdf) && (
                            <div className="export-btn" onClick={handleDownloadPdfList}>
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.downloadStructureTypesListExcel) && (
                            <div className="export-btn" onClick={handleDownloadExcelList}>
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllStructureTypes)}
                            onKeyUp={e => handleTableSearch(e, getAllStructureTypes)}
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
                                        {(isSuperAdmin() && !params?.organizationId) && (
                                            <td>{item?.organization?.name ?? "-"}</td>
                                        )}
                                        <td>{item.title}</td>
                                        <td>{item?.slug}</td>
                                        <td>
                                            {item?.is_active ? (
                                                <span className="status-tile green">Active</span>
                                            ) : (
                                                <span className="status-tile yellow">Inactive</span>
                                            )}
                                        </td>
                                        {(isSuperAdmin() && !params?.organizationId) && (
                                            <td>
                                                {item?.organization?.add_structure_type ? (
                                                    <span className="status-tile green">Yes</span>
                                                ) : (
                                                    <span className="status-tile red">No</span>
                                                )}
                                            </td>
                                        )}
                                        {/* <td>
                                            <span className="status danger">No</span>
                                        </td> */}
                                        <td>
                                            <div className="table-action-icons">
                                                {!isSuperAdmin() ? <Fragment>
                                                    {hasAccess(sitePermissions.editStructureType) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => goToUpdateStructureType(item?.id)}
                                                        >
                                                            <EditTableSvg />
                                                        </div>
                                                    )}

                                                    {hasAccess(sitePermissions.deleteStructureType) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => handleDelete(item?.id)}
                                                        >
                                                            <DeleteTableSvg />
                                                        </div>
                                                    )}
                                                </Fragment> : ''}
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
            </STListingSection>
        </Main>
    );
};

export default StructureTypeListing;
