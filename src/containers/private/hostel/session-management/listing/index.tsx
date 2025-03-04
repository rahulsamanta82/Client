import React, { FC, Fragment } from "react";
import {
    SessionManagementListingSection,
    SessionManagementListingMain,
    SessionManagementListingTop,
} from "./style";
import { useState } from "react";
import {
    CallTableSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    MessageTableSvg,
    PdfSvg,
    SearchFieldSvg,
    PrintSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import Breadcrumb from "components/particles/breadcrumb";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const SessionListing: FC = () => {
    const { hasAccess } = useStore();

    const columns: string[] = [
        "Title",
        "Start Date",
        "End Date",
        "Due Date Old",
        "Due Date New",
        "Expiry Date Old",
        "Expiry Date New",
        "Is Active",
        "Action",
    ];

    const items: any = [
        {
            Title: "Fall 2019",
            StartDate: "23-04-2020",
            EndDate: "23-04-2020",
            DueDateOld: "23-04-2020",
            DueDateNew: "23-04-2021",
            ExpiryDateOld: "23-04-2020",
            ExpiryDateNew: "23-04-2021",
            IsActive: "Yes",
        },
        {
            Title: "Fall 2019",
            StartDate: "23-04-2020",
            EndDate: "23-04-2020",
            DueDateOld: "23-04-2020",
            DueDateNew: "23-04-2021",
            ExpiryDateOld: "23-04-2020",
            ExpiryDateNew: "23-04-2021",
            IsActive: "Yes",
        },
        {
            Title: "Fall 2019",
            StartDate: "23-04-2020",
            EndDate: "23-04-2020",
            DueDateOld: "23-04-2020",
            DueDateNew: "23-04-2021",
            ExpiryDateOld: "23-04-2020",
            ExpiryDateNew: "23-04-2021",
            IsActive: "Yes",
        },
        {
            Title: "Fall 2019",
            StartDate: "23-04-2020",
            EndDate: "23-04-2020",
            DueDateOld: "23-04-2020",
            DueDateNew: "23-04-2021",
            ExpiryDateOld: "23-04-2020",
            ExpiryDateNew: "23-04-2021",
            IsActive: "Yes",
        },

        // Add more hostel objects here
    ];

    // const item : any[] = [
    //  'Shayan','Ali','waleed','ali',

    // ]

    // const item :any= {
    //     "0": { "id": 0, "name": "Available" },
    //     "1": { "id": 1, "name": "Ready" },
    //     "2": { "id": 2, "name": "Started" }
    //  }

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllOrganizations(page + 1);
    };
    const getAllOrganizations = (page: number = 1) => {
        // getOrganizations(setData, { ...pagination, page }, setPagination, search);
    };
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(siteRoutes.createHostelSession);
    };

    return (
        <SessionManagementListingMain>
            <SessionManagementListingTop>
                <div className="left">
                    <span className="page-heading">Sessions</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createHostelSession) && (
                        <div className="create-org-btn">
                            <button
                                className="lg-rounded-btn"
                                type="button"
                                onClick={handleClick}
                            >
                                + Add New
                            </button>
                        </div>
                    )}
                </div>
            </SessionManagementListingTop>

            <SessionManagementListingSection className="content-radius shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadHostelSessionPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.downloadHostelSessionExcel) && (
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
                        <input type="search" placeholder="Search" />
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
                            {items?.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="">{items.Title}</div>
                                        </td>

                                        <td>
                                            <div>{items.StartDate}</div>
                                        </td>
                                        <td>{items.EndDate}</td>
                                        <td className="">{items.DueDateNew}</td>
                                        <td>{items.DueDateOld}</td>
                                        <td className="">{items.ExpiryDateNew}</td>
                                        <td>{items.ExpiryDateOld}</td>
                                        <td>{items.IsActive}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.editHostelSession) && (
                                                    <div className="action-icon">
                                                        <EditTableSvg />
                                                    </div>
                                                )}
                                                {hasAccess(sitePermissions.deleteHostelSession) && (
                                                    <div className="action-icon">
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
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </SessionManagementListingSection>
        </SessionManagementListingMain>
    );
};

export default SessionListing;
