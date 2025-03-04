import { FC, Fragment, useState } from "react";
import { AdmissionDocumentsMasterListingMain, AdmissionDocumentsMasterListingSection, AdmissionDocumentsMasterListingTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AdmissionDocumentsMasterListingProps { }

const AdmissionDocumentsMasterListing: FC<AdmissionDocumentsMasterListingProps> = () => {

    const columns: string[] = [
        'Title',
        'All Programs',
        'Display Order',
        'Action'
    ];

    const { hasAccess } = useStore();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    return (
        <AdmissionDocumentsMasterListingMain>
            <AdmissionDocumentsMasterListingTop>
                <div className="left">
                    <span className="page-heading">Manage Documents Master List</span>
                    <Breadcrumb />
                </div>
                <div className="right">

                    {hasAccess(sitePermissions.createAdmissionDocument) && <div className="add-new-button">
                        <button className="lg-rounded-btn">+ Add New</button>
                    </div>}
                </div>
            </AdmissionDocumentsMasterListingTop>

            <AdmissionDocumentsMasterListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAdmissionDocumentsPDF) && <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>}

                        {hasAccess(sitePermissions.downloadAdmissionDocumentsExcel) && <div className="export-btn">
                            <span>
                                <ExcelSvg className="icon" />
                            </span>
                            <span className="text">Excel</span>
                        </div>}
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
                                            <div className="mw-200">
                                                Matriculation Certificate / Equivalent
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                        No
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-no-${index}`}
                                                    />
                                                </div>
                                                <div className="radio">
                                                    <label htmlFor={`is-specialization-yes-${index}`}>
                                                        Yes
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-yes-${index}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>10</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(sitePermissions.editAdmissionDocument) && <div
                                                    className="action-icon"
                                                >
                                                    <EditTableSvg />
                                                </div>}

                                                {hasAccess(sitePermissions.admissionDocumentDelete) && <div
                                                    className="action-icon"
                                                >
                                                    <DeleteTableSvg />
                                                </div>}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    <Pagination {...pagination} onPageChange={() => console.log('page changes')} />
                </Fragment>
            </AdmissionDocumentsMasterListingSection>
        </AdmissionDocumentsMasterListingMain>
    )
}

export default AdmissionDocumentsMasterListing;