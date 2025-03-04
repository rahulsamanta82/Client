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
    AcademicExamListingMain,
    AcademicExamListingSection,
    AcademicExamListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const AcademicExamListing: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = ["", "Exam Title", "Start date", "End date", "Session", "Campus", "Enrollments", "Invigilators"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },

        { title: "Exams", path: siteRoutes.academicExamsListing },
    ];
    const navigate = useNavigate();

    const goToCreateExam = () => {
        navigate(siteRoutes.createAcademicExam);
    };

    const toggleRowExpand = (index: number) => {
        const dat = [...data];
        dat[index].isExpanded = !dat[index].isExpanded;
        setData([...dat]);
    };

    const [data, setData] = useState<any[]>([
        {
            isExpanded: false,
        },
        {
            isExpanded: false,
        },
        {
            isExpanded: false,
        },
        {
            isExpanded: false,
        },
    ]);

    return (
        <AcademicExamListingMain>
            <AcademicExamListingTop>
                <div className="left">
                    <span className="page-heading">Exam Types</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreateExam}>
                            + Add Exam
                        </button>
                    </div>
                </div>
            </AcademicExamListingTop>

            <AcademicExamListingSection className="content-radius-shadow">
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
                            {data.map((item: any, index: number) => (
                                <Fragment key={index}>
                                    <tr className={`expandable ${item.isExpanded && "opened"}`}>
                                        <td>
                                            <div
                                                className="rounded-expand-button"
                                                onClick={() => toggleRowExpand(index)}
                                            >
                                                <span>{item.isExpanded ? "-" : "+"}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mw-150">
                                                FA&E Spring 2021 Combined[Mid and Final Term]
                                            </div>
                                        </td>
                                        <td>2023-08-21</td>
                                        <td>2023-09-11</td>
                                        <td>Spring 2021</td>
                                        <td>
                                            <div className="mw-100">Bahawalpur</div>
                                        </td>
                                        <td>
                                            11950
                                        </td>
                                        <td>370</td>
                                    </tr>

                                    {item.isExpanded && (
                                        <tr>
                                            <td colSpan={9}>
                                                <div className="expanded-content">
                                                    <div className="particular-info">
                                                        <span className="title">
                                                            Status
                                                        </span>
                                                        <div className="info">
                                                            <div className="table-radio-field">
                                                                <div className="radio">
                                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                                        Active
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`is-specialization-${index}`}
                                                                        id={`is-specialization-no-${index}`}
                                                                    />
                                                                </div>
                                                                <div className="radio">
                                                                    <label htmlFor={`is-specialization-yes-${index}`}>
                                                                        Non-Active
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`is-specialization-${index}`}
                                                                        id={`is-specialization-yes-${index}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="particular-info">
                                                        <span className="title">
                                                            Status
                                                        </span>
                                                        <div className="info">
                                                            <div className="table-radio-field">
                                                                <div className="radio">
                                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                                        Yes
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`is-specialization-${index}`}
                                                                        id={`is-specialization-no-${index}`}
                                                                    />
                                                                </div>
                                                                <div className="radio">
                                                                    <label htmlFor={`is-specialization-yes-${index}`}>
                                                                        No
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`is-specialization-${index}`}
                                                                        id={`is-specialization-yes-${index}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="particular-info">
                                                        <span className="title">
                                                            Action:
                                                        </span>
                                                        <div className="info">
                                                            <div className="table-action-buttons">
                                                                <div className="action-icon">
                                                                    <EditTableSvg />
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Manage Exam Programs</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="yellow">Manage Exam Rooms</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Manage Exam invigilators</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Manage Day Slots</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Generate Exam Plan</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Download Datesheet</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Download Seating plan</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Download Attendance Sheet</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Download Room Envelop</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button>Conflict Report</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button>Enrollment Report</button>
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
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <Fragment>
                        <Pagination
                            onPageChange={(page: any) => console.log(page)}
                            {...pagination}
                        />
                    </Fragment>
                </div>
            </AcademicExamListingSection>
        </AcademicExamListingMain>
    );
};

export default AcademicExamListing;
