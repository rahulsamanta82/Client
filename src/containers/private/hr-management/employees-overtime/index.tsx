import { FC, Fragment, useState } from "react";
import {
    DeleteTableSvg,
    DownArrowLightgrayMediumSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    EmployeesOvertimeListingMain,
    EmployeesOvertimeListingSection,
    EmployeesOvertimeListingTop,
    FilterHeader,
    Filters,
    FilterSection
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";

const EmployeesOvertimeListing: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = ["Name", "Department", "Designation", "Overtime Device", "Overtime Modify", "Overtime Total", "Action"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
        { title: "Employees Overtime", path: siteRoutes.employeesOvertimeListing },
    ];
    const navigate = useNavigate();

    const toggleFilterDropdown = () => {
        setOpenFilterDropdown(!openFilterDropdown);
    };


    return (
        <EmployeesOvertimeListingMain>
            <EmployeesOvertimeListingTop>
                <div className="left">
                    <span className="page-heading">Employees Overtime</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </EmployeesOvertimeListingTop>

            <FilterSection className="content-radius-shadow">
                <FilterHeader showFilterDropdown={openFilterDropdown}>
                    <span className="filter-heading">Filter</span>
                    <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
                        <DownArrowLightgrayMediumSvg className="icon" />
                    </span>
                </FilterHeader>
                {openFilterDropdown && (
                    <Filters>
                        <div className="filter-fields">
                            <div className="input-field">
                                <label>From date</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>To date</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Department</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select name="session">
                                            <option value="">Select Department</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="submit-buttons">
                            <div className="buttons">
                                <button className="lg-rounded-btn gray">Reset</button>
                                <button className="lg-rounded-btn">Apply Filters</button>
                            </div>
                        </div>
                    </Filters>
                )}
            </FilterSection>

            <EmployeesOvertimeListingSection className="content-radius-shadow">
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
                            {[].map((item: any, index: number) => (
                                <Fragment key={index}>
                                    <tr>
                                        <td>
                                            300100001fafsdgwrc
                                        </td>
                                        <td>
                                            <div className="mw-100">
                                                Mr. Nazir Ahmed
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <EditTableSvg />
                                                </div>
                                                <div className="action-icon">
                                                    <DeleteTableSvg />
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
                    <DataNotFound show />
                    <Pagination
                        onPageChange={(page: any) => console.log(page)}
                        {...pagination}
                    />
                </Fragment>
            </EmployeesOvertimeListingSection>
        </EmployeesOvertimeListingMain>
    );
};

export default EmployeesOvertimeListing;
