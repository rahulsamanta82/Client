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
    AcademicFeeTransactionsListingMain,
    AcademicFeeTransactionsListingSection,
    AcademicFeeTransactionsListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";

const AcademicFeeTransactionsListing: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = ["Students", "Date of Transaction", "Amount(PKR)", "Fee Transaction Head", "Semester", "Challan No.", "Year", "Reference", "Entered By", "Action"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },

        { title: "Fee Transactions", path: siteRoutes.academicFeeTransactionsListing },
    ];
    const navigate = useNavigate();

    const goToCreateFeeReceipt = () => {
        navigate(siteRoutes.createAcademicFeeReceipt);
    };

    return (
        <AcademicFeeTransactionsListingMain>
            <AcademicFeeTransactionsListingTop>
                <div className="left">
                    <span className="page-heading">Fee Plans </span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreateFeeReceipt}>
                            + Add Fee Receipt
                        </button>
                    </div>
                </div>
            </AcademicFeeTransactionsListingTop>

            <AcademicFeeTransactionsListingSection className="content-radius-shadow">
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
            </AcademicFeeTransactionsListingSection>
        </AcademicFeeTransactionsListingMain>
    );
};

export default AcademicFeeTransactionsListing;
