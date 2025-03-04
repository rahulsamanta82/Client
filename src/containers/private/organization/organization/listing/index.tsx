import Breadcrumb from "components/particles/breadcrumb";
import { FC, Fragment, useEffect, useState } from "react";
import { OrgListingMain, OrgListingSection, OrgListingTop } from "./style";
import {
    BlackTableViewSvg,
    CallTableSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    MessageTableSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import useAlert from "hooks/useAlert";
import useOrganization from "../../useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useStore from "hooks/useStore";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import useUtils from "hooks/useUtils";

interface OrganizationListingProps { }

const OrganizationListing: FC<OrganizationListingProps> = () => {
    const breadcrumbLinks = [
        { title: "Organization /", path: "" },
        { title: "Organizations", path: siteRoutes.organizationListing },
    ]
    const columns: string[] = [
        "Logo",
        "Name",
        "Domain",
        "Address",
        "City",
        "District",
        "Action",
    ];
    const navigate = useNavigate();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [data, setData] = useState<any[]>([]);
    const { confirmationPopup } = useAlert();
    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();
    const {
        getOrganizations,
        deleteOrganization,
        downloadOrganizationsExcelFile,
        downloadOrganizationsPdfFile,
    } = useOrganization();

    const goToCreateOrg = () => {
        navigate(siteRoutes.createOrganization);
    };

    const handleDelete = async (id: number) => {
        const result = await confirmationPopup();
        if (result.isConfirmed) {
            deleteOrganization(id, setData, pagination, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllOrganizations(page + 1, search);
    };

    const goToUpdateOrg = (id: number) => {
        navigate(`${siteRoutes.createOrganization}?id=${id}`);
    };

    const getAllOrganizations = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getOrganizations(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllOrganizations(pagination.page, search);
    }, []);

    const goToViewOrg = (id: number) => {
        navigate(`${siteRoutes.viewOrganization}?id=${id}`);
    };

    return (
        <OrgListingMain>
            <OrgListingTop>
                <div className="left">
                    <span className="page-heading">Organization Listing</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createOrganization) && (
                        <div className="create-org-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateOrg}>
                                + Add Organization
                            </button>
                        </div>
                    )}
                </div>
            </OrgListingTop>
            <OrgListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadOrgListPdf) && (
                            <div className="export-btn" onClick={downloadOrganizationsPdfFile}>
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}

                        {hasAccess(sitePermissions.downloadOrgListExcel) && (
                            <div className="export-btn" onClick={downloadOrganizationsExcelFile}>
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllOrganizations)}
                            onKeyUp={e => handleTableSearch(e, getAllOrganizations)}
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
                                        <td>
                                            {item?.logo ? <div className="org-image">
                                                <img src={item?.logo} alt="" />
                                            </div> : <div className="org-logo"></div>}


                                        </td>
                                        <td>
                                            <div className="mw-150">{item?.name}</div>
                                        </td>
                                        <td>{item?.domain ?? "-"}</td>
                                        <td>
                                            <div className="mw-150">{item?.address1}</div>
                                        </td>
                                        <td>{item?.city?.title ?? "-"}</td>
                                        <td>{item?.district?.title ?? "-"}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.viewOrganization) && (
                                                    <div
                                                        className="action-icon"
                                                        onClick={() => goToViewOrg(item.id)}
                                                    >
                                                        <BlackTableViewSvg />
                                                    </div>
                                                )}
                                                {hasAccess(sitePermissions.editOrganization) && (
                                                    <div
                                                        className="action-icon"
                                                        onClick={() => goToUpdateOrg(item.id)}
                                                    >
                                                        <EditTableSvg />
                                                    </div>
                                                )}
                                                <div className="action-icon">
                                                    <CallTableSvg />
                                                </div>
                                                <div className="action-icon">
                                                    <MessageTableSvg />
                                                </div>
                                                {hasAccess(sitePermissions.deleteOrganization) && (
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
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </OrgListingSection>
        </OrgListingMain>
    );
};

export default OrganizationListing;
