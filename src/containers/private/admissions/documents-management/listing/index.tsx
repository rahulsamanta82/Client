import { FC, Fragment, useState } from "react";
import {
    CallTableSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    MessageTableSvg,
    PdfSvg,
    SearchFieldSvg,
    TableAddPdfGreenSvg,
    TableBlackRightArrowSvg,
    TableDownloadPrimarySvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
    AdmissionDocumentsListingMain,
    AdmissionDocumentsListingSection,
    AdmissionDocumentsListingTop,
} from "./style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface AdmissionStudentListingProps { }

const AdmissionDocumentsListing: FC<AdmissionStudentListingProps> = ({ }) => {
    const [data, setData] = useState<any[]>([
        { isExpanded: false },
        { isExpanded: false },
        { isExpanded: false },
        { isExpanded: false },
    ]);
    const [search, setSearch] = useState("");
    const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = [
        "Degree",
        "Ask for Subjects",
        "Is Specialization",
        "Required Subjects",
        "Required Marks",
        "Status",
        "Action",
    ];

    const toggleRowExpand = (index: number) => {
        const dat = [...data];
        dat[index].isExpanded = !dat[index].isExpanded;
        setData([...dat]);
    };

    const toggleFilterDropdown = () => {
        setOpenFilterDropdown(!openFilterDropdown);
    };
    const navigate = useNavigate();

    return (
        <AdmissionDocumentsListingMain>
            <AdmissionDocumentsListingTop>
                <div className="left">
                    <span className="page-heading">Manage Documents Master List</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="download-list-button">
                        <button className="lg-rounded-btn" onClick={() => navigate(siteRoutes.editAdmissionDocument)}>+ New</button>
                    </div>
                </div>
            </AdmissionDocumentsListingTop>

            <AdmissionDocumentsListingSection className="content-radius-shadow">
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
                        // onKeyUp={handleSearch}
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
                            {data.map((item: any, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <tr className={`expandable ${item.isExpanded && "opened"}`}>
                                            <td>Matriculation</td>
                                            <td>
                                                <div className="table-radio-field">
                                                    <div className="radio">
                                                        <label htmlFor={`ask-for-subjects-yes-${index}`}>
                                                            Yes
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name={`ask-for-subjects-${index}`}
                                                            id={`ask-for-subjects-yes-${index}`}
                                                        />
                                                    </div>
                                                    <div className="radio">
                                                        <label htmlFor={`ask-for-subjects-no-${index}`}>
                                                            No
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name={`ask-for-subjects-${index}`}
                                                            id={`ask-for-subjects-no-${index}`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="table-radio-field">
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
                                                </div>{" "}
                                            </td>
                                            <td>
                                                <div className="table-radio-field">
                                                    <div className="radio">
                                                        <label htmlFor={`required-subjects-yes-${index}`}>
                                                            Yes
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="required-subjects"
                                                            id={`required-subjects-yes-${index}`}
                                                        />
                                                    </div>
                                                    <div className="radio">
                                                        <label htmlFor={`required-subjects-no-${index}`}>
                                                            No
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="required-subjects"
                                                            id={`required-subjects-no-${index}`}
                                                        />
                                                    </div>
                                                </div>{" "}
                                            </td>
                                            <td>
                                                <div className="table-radio-field">
                                                    <div className="radio">
                                                        <label htmlFor={`required-marks-yes-${index}`}>
                                                            Yes
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="required-marks"
                                                            id={`required-marks-yes-${index}`}
                                                        />
                                                    </div>
                                                    <div className="radio">
                                                        <label htmlFor={`required-marks-no-${index}`}>
                                                            No
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="required-marks"
                                                            id={`required-marks-no-${index}`}
                                                        />
                                                    </div>
                                                </div>{" "}
                                            </td>
                                            <td>
                                                <div className="table-radio-field">
                                                    <div className="radio">
                                                        <label htmlFor={`status-yes-${index}`}>Yes</label>
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            id={`status-yes-${index}`}
                                                        />
                                                    </div>
                                                    <div className="radio">
                                                        <label htmlFor={`status-no-${index}`}>No</label>
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            id={`status-no-${index}`}
                                                        />
                                                    </div>
                                                </div>{" "}
                                            </td>
                                            <td>
                                                <div className="table-action-icons">
                                                    <div className="action-icon">
                                                        <TableAddPdfGreenSvg />
                                                    </div>
                                                    <div className="action-icon">
                                                        <EditTableSvg />
                                                    </div>
                                                    <div className="action-icon">
                                                        <DeleteTableSvg />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {item.isExpanded && (
                                            <tr>
                                                <td></td>
                                                <td colSpan={5}>
                                                    <div className="expanded-content">
                                                        <div className="particular-info">
                                                            <span className="title">Registration Date</span>
                                                            <span className="info">2023-08-21</span>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Merit</span>
                                                            <span className="info">80.55</span>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Challan No. </span>
                                                            <div className="info">
                                                                <span className="status">155181518</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Program</span>
                                                            <div className="info">
                                                                <span className="status">BSCS</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Quota</span>
                                                            <div className="info">
                                                                <span className="status">Open</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">City</span>
                                                            <div className="info">
                                                                <span className="status">Khan Pur</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Domicile</span>
                                                            <div className="info">
                                                                <span className="status">Rahim Yar Khan</span>
                                                            </div>
                                                        </div>
                                                        <div className="particular-info">
                                                            <span className="title">Action</span>
                                                            <div className="info">
                                                                <div className="table-action-icons">
                                                                    <div className="action-icon">
                                                                        <TableBlackRightArrowSvg />
                                                                    </div>
                                                                    <div className="action-icon download">
                                                                        <TableDownloadPrimarySvg />
                                                                    </div>
                                                                    <div className="action-icon">
                                                                        <EditTableSvg />
                                                                    </div>

                                                                    <div className="action-icon">
                                                                        <CallTableSvg />
                                                                    </div>

                                                                    <div className="action-icon">
                                                                        <MessageTableSvg />
                                                                    </div>

                                                                    <div className="action-icon">
                                                                        <DeleteTableSvg />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    <Pagination
                        onPageChange={(page: any) => console.log(page)}
                        {...pagination}
                    />
                </Fragment>
            </AdmissionDocumentsListingSection>
        </AdmissionDocumentsListingMain>
    );
};

export default AdmissionDocumentsListing;
