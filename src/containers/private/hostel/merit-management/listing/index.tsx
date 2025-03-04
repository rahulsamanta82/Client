import React, { FC } from "react";
import {
    MeritListListingSection,
    MeritListListingMain,
    MeritListListingTop,
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

const MeritListing: FC = () => {
    const { hasAccess } = useStore();

    const columns: string[] = [
        "Title",
        "List No",
        "Session",
        "Due Date",
        "Expiry Date",
        "Is Active",
        "Action",
    ];

    const items: any = [
        {
            Title: "1st Merit List Fall 2020",
            ListNo: "1",
            Session: "Fall 2020",
            DueDate: "23-04-2020",
            ExpiryDate: "23-04-2021",
            IsActive: "Yes",
        },
        {
            Title: "1st Merit List Fall 2020",
            ListNo: "1",
            Session: "Fall 2020",
            DueDate: "23-04-2020",
            ExpiryDate: "23-04-2021",
            IsActive: "Yes",
        },
        {
            Title: "1st Merit List Fall 2020",
            ListNo: "1",
            Session: "Fall 2020",
            DueDate: "23-04-2020",
            ExpiryDate: "23-04-2021",
            IsActive: "Yes",
        },
        {
            Title: "1st Merit List Fall 2020",
            ListNo: "1",
            Session: "Fall 2020",
            DueDate: "23-04-2020",
            ExpiryDate: "23-04-2021",
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
        navigate(siteRoutes.createHostelMerit);
    };

    return (
        <MeritListListingMain>
            <MeritListListingTop>
                <div className="left">
                    <span className="page-heading">Hostel Merit List</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.hostelMeritListing) && (
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
            </MeritListListingTop>

            <MeritListListingSection className="content-radius shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadHostelMeritPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.downloadHostelMeritExcel) && (
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
                                            <div>{items.ListNo}</div>
                                        </td>
                                        <td>{items.Session}</td>
                                        <td className="">{items.DueDate}</td>
                                        <td>{items.ExpiryDate}</td>
                                        <td>{items.IsActive}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.editHostelMerit) && (
                                                    <div className="action-icon">
                                                        <EditTableSvg />
                                                    </div>
                                                )}

                                                {hasAccess(sitePermissions.deleteHostelMerit) && (
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

                <div className="last-portion">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "var(--black-text)",
                        }}
                    >
                        <p>Show</p>
                        <select name="" id="" className="drop-down">
                            <option value="0">10</option>
                        </select>
                        <p>enteries</p>
                    </div>
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </div>
            </MeritListListingSection>
        </MeritListListingMain>
    );
};

export default MeritListing;
