import { FC, Fragment, useState } from "react";
import {
    DownArrowLightgrayMediumSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    AcademicPaidVouchersListingMain,
    AcademicPaidVouchersListingSection,
    AcademicPaidVouchersListingTop,
    FilterHeader,
    Filters,
    FilterSection
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import DataNotFound from "components/particles/table/data-not-found";

const AcademicPaidVouchersListing: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = ["RegNo", "Name", "CNIC", "Program", "Challan No", "Amount", "Verified at", "Action"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Paid Vouchers", path: siteRoutes.academicPaidVouchersListing },
    ];

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
    }

    return (
        <AcademicPaidVouchersListingMain>
            <AcademicPaidVouchersListingTop>
                <div className="left">
                    <span className="page-heading">Paid Vouchers</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </AcademicPaidVouchersListingTop>

            <FilterSection className="content-radius-shadow">
                <FilterHeader showFilterDropdown={showFilterDropdown}>
                    <span className="filter-heading">Filter</span>
                    <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
                        <DownArrowLightgrayMediumSvg className="icon" />
                    </span>
                </FilterHeader>
                {showFilterDropdown && (
                    <Filters>
                        <div className="filter-fields">
                            <div className="input-field">
                                <label htmlFor="">Academic Session</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select Academic Session</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">CNIC</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="text" placeholder="CNIC" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Reg No</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="text" placeholder="Reg No" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="submit-buttons">
                            <div className="buttons">
                                <button className="lg-rounded-btn gray">
                                    Reset
                                </button>
                                <button
                                    className="lg-rounded-btn"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </Filters>
                )}
            </FilterSection>

            <AcademicPaidVouchersListingSection className="content-radius-shadow">
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
                                            <div className="mw-150">
                                                FoA-Foisl-FoEdu-MA-BS-MORN-2nd Sem
                                            </div>
                                        </td>
                                        <td>Yes</td>
                                        <td>318906</td>
                                        <td>7654</td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <EditTableSvg />
                                                </div>
                                                <div className="table-action-button">
                                                    <button className="green">Copy & Create New</button>
                                                </div>
                                                <div className="table-action-button">
                                                    <button className="black"> Manage Fee</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <DataNotFound show />
                    <Fragment>
                        <Pagination
                            onPageChange={(page: any) => console.log(page)}
                            {...pagination}
                        />
                    </Fragment>
                </div>
            </AcademicPaidVouchersListingSection>
        </AcademicPaidVouchersListingMain>
    );
};

export default AcademicPaidVouchersListing;
