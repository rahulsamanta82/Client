import React, { FC } from "react";
import {
    HostelManagementListingSection,
    HostelManagementListingMain,
    HostelManagementListingTop,
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

const HostelManagement: FC = () => {
    const { hasAccess } = useStore();

    const columns: string[] = [
        "Name",
        "Type",
        "Rooms",
        "Enrolled Students",
        "Adress",
        "Note",
        "Action",
    ];

    const items: any = [
        {
            name: "Green Valley Hostel",
            type: "Boys",
            rooms: 50,
            enrolledStudents: 200,
            address: "123 Green St, Cityville",
            note: "Near the park",
        },
        {
            name: "Sunrise Hostel",
            type: "Girls",
            rooms: 40,
            enrolledStudents: 180,
            address: "456 Sunrise Ave, Townsville",
            note: "Close to the university",
        },
        // Add more hostel objects here
    ];

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
        navigate(siteRoutes.createHostel);
    };

    return (
        <HostelManagementListingMain>
            <HostelManagementListingTop>
                <div className="left">
                    <span className="page-heading">Hostel Listing</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createHostel) && (
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
            </HostelManagementListingTop>

            <HostelManagementListingSection className="content-radius shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadHostelPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.downloadHostelExcel) && (
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
                                            <div className="">{items.name}</div>
                                        </td>
                                        <td>
                                            <div>{items.type}</div>
                                        </td>
                                        <td>{items.rooms}</td>
                                        <td className="mw-150">{items.enrolledStudents}</td>
                                        <td>{items.address}</td>
                                        <td>{items.note}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.hostelEdit) && (
                                                    <div className="action-icon">
                                                        <EditTableSvg />
                                                    </div>
                                                )}
                                                <div className="action-icon">
                                                    <CallTableSvg />
                                                </div>
                                                <div className="action-icon">
                                                    <MessageTableSvg />
                                                </div>
                                                {hasAccess(sitePermissions.hostelDelete) && (
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
            </HostelManagementListingSection>
        </HostelManagementListingMain>
    );
};

export default HostelManagement;
