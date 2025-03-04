import { FC, Fragment, useEffect, useState } from "react";
import {
    AcademicCoursesListingSection,
    AcademicCoursesListingMain,
    AcademicCoursesListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useAcademics from "../../useHooks";
import { TemplateCourseDTO } from "utils/helpers/models/academics/template-course.dto";
import AllocateSection from "./components/select-campus";
import SelectCampus from "./components/select-campus";

interface AcademicCoursesListingProps { }

const AcademicCoursesListing: FC<AcademicCoursesListingProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics/ ", path: siteRoutes.academicSessionListing },
        { title: "Academic Sessions/ ", path: siteRoutes.academicSessionListing },
        {
            title: "Manage Academic Sessions / ",
            path: siteRoutes.academicSessionManagementListing,
        },
        { title: "Courses ", path: siteRoutes.academicCourseListing },
    ];
    const navigate = useNavigate();
    const [data, setData] = useState<TemplateCourseDTO[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { getTemplateCourses } = useAcademics();
    const [search, setSearch] = useState<string>("");
    const columns: string[] = [
        "",
        "Course Title",
        "Course Code",
        "Department",
        "Credit Hours",
        "Is Virtual",
        "Is Lab",
        "Is Elective",
    ];

    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    useEffect(() => {
        getAllAcademicCourses(pagination.page, search);
    }, []);

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllAcademicCourses(page + 1, search);
    };
    const getAllAcademicCourses = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            // search,
        };
        getTemplateCourses(setData, queryParams, setPagination);
    };

    const onSelectCourse = (id: number) => {
        if (selectedCourses.includes(id)) {
            const index = selectedCourses.findIndex((c) => c == id);
            selectedCourses.splice(index, 1);
        } else {
            selectedCourses.push(id);
        }

        setSelectedCourses([...selectedCourses]);
    };
    const [openSelectCampusModal, setOpenSelectCampusModal] = useState<boolean>(false);

    const goToSelectCampus = () => {
        setOpenSelectCampusModal(true);
    };

    return (
        <AcademicCoursesListingMain>
            <AcademicCoursesListingTop>
                <div className="left">
                    <span className="page-heading">Courses</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="create-fine-slot-btn">
                        {selectedCourses.length && (
                            <button className="lg-rounded-btn" onClick={goToSelectCampus}>
                                + Add selected courses to session
                            </button>
                        )}
                    </div>
                </div>
            </AcademicCoursesListingTop>

            <AcademicCoursesListingSection className="content-radius-shadow">
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
                            onChange={(e) =>
                                handleSearchChange(e, setSearch, getAllAcademicCourses)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllAcademicCourses)}
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
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="table-checkbox-field">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCourses.includes(course.id)}
                                                    onChange={() => onSelectCourse(course.id)}
                                                />
                                            </div>
                                        </td>
                                        <td>BS Economics</td>
                                        <td>{course.tc_code}</td>
                                        <td>
                                            <div className="mw-150">
                                                Information and Communication Engineering
                                            </div>
                                        </td>
                                        <td>{course.tc_credit_hours}</td>
                                        <td>
                                            <div className="status">
                                                {course.tc_is_virtual ? (
                                                    <span className="status-tile green">Yes</span>
                                                ) : (
                                                    <span className="status-tile red">No</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status">
                                                {course.tc_is_lab ? (
                                                    <span className="status-tile green">Yes</span>
                                                ) : (
                                                    <span className="status-tile red">No</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status">
                                                {course.tc_is_elective ? (
                                                    <span className="status-tile green">Yes</span>
                                                ) : (
                                                    <span className="status-tile red">No</span>
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
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination {...pagination} onPageChange={onPageChange} />
                    {openSelectCampusModal && <SelectCampus setOpen={setOpenSelectCampusModal} selectedCourses={selectedCourses} />}
                </Fragment>
            </AcademicCoursesListingSection>
        </AcademicCoursesListingMain>
    );
};

export default AcademicCoursesListing;
