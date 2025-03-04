import { FC, Fragment, useState } from "react";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    RequestedLeavesListingMain,
    RequestedLeavesListingSection,
    RequestedLeavesListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";

const RequestedLeavesListing: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = ["Employee Name", "Leave Type", "From date", "To date", "Total days", "Paid", "Action"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
        { title: "Requested Leaves", path: siteRoutes.requestedLeavesListing },
    ];
    const navigate = useNavigate();


    return (
        <RequestedLeavesListingMain>
            <RequestedLeavesListingTop>
                <div className="left">
                    <span className="page-heading">Requested Leaves</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn">
                            +  Apply Leave
                        </button>
                    </div>
                </div>
            </RequestedLeavesListingTop>

            <RequestedLeavesListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>

                        <div className="export-btn">
                            <span>
                                <ExcelSvg className="icon" />
                            </span>
                            <span className="text">Excel</span>
                        </div>
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
                            {[1, 1, 1, 1, 1].map((item: any, index: number) => (
                                <Fragment key={index}>
                                    <tr>
                                        <td>
                                            <div className="mw-150">
                                                M. Waleed Tahir
                                            </div>
                                        </td>
                                        <td>
                                            Casual Leave
                                        </td>
                                        <td>2024-05-05</td>
                                        <td>2024-05-08</td>
                                        <td>10</td>
                                        <td>
                                            <span className="status-tile green">
                                                Paid
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-action-buttons">
                                                <div className="table-action-button">
                                                    <button>Withdraw Leave</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Fragment>
                    {/* <DataNotFound show /> */}
                    <Pagination
                        onPageChange={(page: any) => console.log(page)}
                        {...pagination}
                    />
                </Fragment>
            </RequestedLeavesListingSection>
        </RequestedLeavesListingMain>
    );
};

export default RequestedLeavesListing;
