import React, { FC } from "react";
import {
    ApplicantManagementListingSection,
    ApplicantManagementListingMain,
    ApplicantManagementListingTop,
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

const ApplicantListing: FC = () => {
    const { hasAccess } = useStore();

    const columns: string[] = ["Name", "Campus", "Hostels", "Action"];

    const items: any = [
        {
            name: "2345678914 Muhammad Aslam (03198765432)",
            campus: "Bahawalpur(Baghdad-ul-Jadid Campus)",
            hostel:
                " Abubakar Hall (Abbasia Campus), Ahmad Hall (BJC Campus), Ali Hall(BJC Campus) Umer Hall(BJC Campus), Usman Hall(BJC Campus)",
        },
        {
            name: "2345678914 Muhammad Aslam (03198765432)",
            campus: "Bahawalpur(Baghdad-ul-Jadid Campus)",
            hostel:
                " Abubakar Hall (Abbasia Campus), Ahmad Hall (BJC Campus), Ali Hall(BJC Campus) Umer Hall(BJC Campus), Usman Hall(BJC Campus)",
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
        navigate(siteRoutes.createApplicant);
    };

    return (
        <ApplicantManagementListingMain>
            <ApplicantManagementListingTop>
                <div className="left">
                    <span className="page-heading"> Applicant Listing</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createApplicant) && (
                        <div className="create-org-btn">
                            <button
                                className="lg-rounded-btn"
                                type="button"
                                onClick={handleClick}
                            >
                                + Add New User
                            </button>
                        </div>
                    )}
                </div>
            </ApplicantManagementListingTop>

            <ApplicantManagementListingSection className="content-radius shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadHostelApplicantPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}
                        {hasAccess(sitePermissions.downloadHostelApplicantExcel) && (
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
                                    return <th key={index}>{column}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">{items.name}</div>
                                        </td>

                                        <td>
                                            <div className="mw-150">{items.campus}</div>
                                        </td>
                                        <td>
                                            {" "}
                                            <div className="mw-150"> {items.hostel}</div>
                                        </td>

                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.editHostelApplicant) && (
                                                    <div className="action-icon">
                                                        <EditTableSvg />
                                                    </div>
                                                )}

                                                {hasAccess(sitePermissions.deleteHostelApplicant) && (
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
                    <div className="drop-down-main">
                        <p>Show</p>
                        <select name="" id="" className="drop-down">
                            <option value="0">10</option>
                        </select>
                        <p>enteries</p>
                    </div>
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </div>
            </ApplicantManagementListingSection>
        </ApplicantManagementListingMain>
    );
};

export default ApplicantListing;
