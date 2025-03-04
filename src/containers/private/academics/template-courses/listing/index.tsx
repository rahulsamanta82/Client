import { FC, Fragment, useEffect, useState } from "react";
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
    AcademicTemplateCoursesListingMain,
    AcademicTemplateCoursesListingSection,
    AcademicTemplateCoursesListingTop,
    FilterHeader,
    Filters,
    FilterSection
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAcademics from "../../useHooks";
import { TemplateCourseDTO } from "utils/helpers/models/academics/template-course.dto";
import DataNotFound from "components/particles/table/data-not-found";

const AcademicTemplateCoursesListing: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Template Courses", path: siteRoutes.academicTemplateCoursesListing },
    ];
    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
    const columns: string[] = ["", "Course Title", "Theory Credit Course", "Lab Credit Hours", "Department", "Is Virtual", "Is Lab", "Is active", "Is elective", "Is Non-Credit", "Grading Template"];
    const navigate = useNavigate();
    const { getTemplateCourses, deleteTemplateCourse } = useAcademics();
    const [data, setData] = useState<TemplateCourseDTO[]>([]);
    const [filters, setFilters] = useState({});
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const goToCreate = () => {
        navigate(siteRoutes.createAcademicTemplateCourse);
    };

    const toggleRowExpand = (index: number) => {
        (data as any)[index].isExpanded = !(data as any)[index].isExpanded;
        setData([...data]);
    }

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
    }

    useEffect(() => {
        getAllTemplateCourses(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteTemplateCourse(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllTemplateCourses(page + 1, search);
    };
    const getAllTemplateCourses = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getTemplateCourses(setData, queryParams, setPagination);
    };

    const goToEdit = (id: number) => {
        navigate(`${siteRoutes.createAcademicTemplateCourse}?id=${id}`);
    }

    return (
        <AcademicTemplateCoursesListingMain>
            <AcademicTemplateCoursesListingTop>
                <div className="left">
                    <span className="page-heading">Template Courses</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add Template Course
                        </button>
                    </div>
                </div>
            </AcademicTemplateCoursesListingTop>

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
                                <label htmlFor="">Course Title</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="text" placeholder="Enter Title" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Course Code</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="text" placeholder="Enter Course Code" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Department Title</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input type="text" placeholder="Department Title" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Virtual Course</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Is active</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <select>
                                            <option value="">Select</option>
                                        </select>
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

            <AcademicTemplateCoursesListingSection className="content-radius-shadow">
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
                            {data.map((course, index) => {
                                return <Fragment key={index}>
                                    <tr className={`expandable ${(course as any).isExpanded && "opened"}`}>
                                        <td>
                                            <div
                                                className="rounded-expand-button"
                                                onClick={() => toggleRowExpand(index)}
                                            >
                                                <span>{(course as any).isExpanded ? "-" : "+"}</span>
                                            </div>
                                        </td>
                                        <td>ENGLISH-1</td>
                                        <td>SW-01101</td>
                                        <td>0</td>
                                        <td>
                                            <div className="mw-150">
                                                Department of Computer Science
                                            </div>
                                        </td>
                                        <td>No</td>
                                        <td>No</td>
                                        <td>Yes</td>
                                        <td>No</td>
                                        <td>No</td>
                                        <td>
                                            <div className="mw-150">
                                                BS General Grade Template
                                            </div>
                                        </td>
                                    </tr>

                                    {(course as any).isExpanded && (
                                        <tr>
                                            <td colSpan={9}>
                                                <div className="expanded-content">
                                                    <div className="particular-info">
                                                        <div className="title">
                                                            Action
                                                        </div>
                                                        <div className="info">
                                                            <div className="table-action-buttons">
                                                                <div className="table-action-button">
                                                                    <button className="green">Manage Co Req Courses</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Manage Equivalent Courses</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Manage Pre Req Courses</button>
                                                                </div>
                                                                <div className="table-action-button">
                                                                    <button className="green">Course Room Allocations</button>
                                                                </div>
                                                                <div className="action-icon" onClick={() => goToEdit(course.id)}>
                                                                    <EditTableSvg />
                                                                </div>
                                                                <div className="action-icon" onClick={() => handleDelete(course.id)}>
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
                            })}
                        </tbody>
                    </table>
                </div>

                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination
                        onPageChange={onPageChange}
                        {...pagination}
                    />
                </Fragment>
            </AcademicTemplateCoursesListingSection>
        </AcademicTemplateCoursesListingMain>
    );
};

export default AcademicTemplateCoursesListing;
