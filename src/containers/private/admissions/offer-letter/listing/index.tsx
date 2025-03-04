import { FC, Fragment, useState } from "react";
import {
    AdmissionOfferLetterListingMain,
    AdmissionOfferLetterListingSection,
    AdmissionOfferLetterListingTop,
} from "./style";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AdmissionOfferLetterListingProps { }

const AdmissionOfferLetterListing: FC<AdmissionOfferLetterListingProps> = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { hasAccess } = useStore();
    const columns: string[] = ["Template Title", "Status", "Action"];

    const navigate = useNavigate();

    return (
        <AdmissionOfferLetterListingMain>
            <AdmissionOfferLetterListingTop>
                <div className="left">
                    <span className="page-heading">Offer Letter Templates</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createAdmissionOfferLetter) && (
                        <div className="create-org-btn">
                            <button
                                className="lg-rounded-btn"
                                onClick={() => navigate(siteRoutes.createAdmissionOfferLetter)}
                            >
                                + New Template
                            </button>
                        </div>
                    )}
                </div>
            </AdmissionOfferLetterListingTop>
            <AdmissionOfferLetterListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAdmissionOfferLetterPDF) && (
                            <div className="export-btn">
                                <span>
                                    <PdfSvg className="icon" />
                                </span>
                                <span className="text">PDF</span>
                            </div>
                        )}

                        {hasAccess(sitePermissions.downloadAdmissionOfferLetterExcel) && (
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
                            {[1, 2, 3].map((item: number, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="mw-150">
                                                LLB - Conditional Offer Letter
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-no-${index}`}
                                                    />
                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                        De - Active
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-yes-${index}`}
                                                    />
                                                    <label htmlFor={`is-specialization-yes-${index}`}>
                                                        Active
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(
                                                    sitePermissions.editAdmissionOfferLetter
                                                ) && (
                                                        <div className="action-icon">
                                                            <EditTableSvg />
                                                        </div>
                                                    )}

                                                {hasAccess(
                                                    sitePermissions.deleteAdmissionOfferLetter
                                                ) && (
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
                    <Pagination
                        {...pagination}
                        onPageChange={() => console.log("page changes")}
                    />
                </Fragment>
            </AdmissionOfferLetterListingSection>
        </AdmissionOfferLetterListingMain>
    );
};

export default AdmissionOfferLetterListing;
