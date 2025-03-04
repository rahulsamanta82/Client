import { FC, Fragment, useEffect, useState } from "react";
import {
  AcademicSessionManagementListingSection,
  AcademicSessionManagementListingTop,
  AcademicSessionManagementListingMain,
  FilterSection,
  FilterHeader,
  Filters,
} from "./style";
import {
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import AllocateSection from "../components/allocate-section";
import AllocateTeacher from "../components/allocate-teacher";
import GradingSchema from "../components/grading-schema";
import useAcademics from "../../useHooks";
import { useSelector } from "react-redux";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import Pagination from "components/particles/table/pagination";
import DataNotFound from "components/particles/table/data-not-found";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import AllocateCourseRooms from "../components/allocate-course-rooms";

interface AcademicSessionManagementListingProps {}

const AcademicSessionManagementListing: FC<
  AcademicSessionManagementListingProps
> = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics/ ", path: siteRoutes.academicSessionListing },
    { title: "Academic Sessions/ ", path: siteRoutes.academicSessionListing },
    {
      title: "Manage Academic Sessions",
      path: siteRoutes.academicSessionManagementListing,
    },
  ];

  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const { getSessionAllocatedCourses } = useAcademics();
  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch, getQueryParams, createQuery } =
    useUtils();
  const { session_id } = getQueryParams();

  const columns: string[] = [
    "",
    "Course Title",
    "Course Code",
    "Associated Sections",
    "Teacher Name",
    "Workload Type",
    "Credit Hours",
  ];
  const [openAllocateSectionModal, setOpenAllocateSectionModal] =
    useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [openAllocateTeacherModal, setOpenAllocateTeacherModal] =
    useState<boolean>(false);
  const [openGradeSchemaModal, setOpenGradeSchemaModal] =
    useState<boolean>(false);
  const [courseId, setCourseId] = useState<number>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");

  const goToGradeSchema = () => {
    setOpenGradeSchemaModal(true);
  };

  // const goToAllocateCourseRoom = (course: any) => {
  //   const { c_title: course_title, id: course_id } = course;
  //   const query = createQuery({ course_title, course_id });
  //   navigate(siteRoutes.allocateCourseRoomListing + query);
  // };
  const goToGradeBooks = () => {
    navigate(siteRoutes.academicGradeBookListing);
  };

  useEffect(() => {
    getAllSessionAllocatedCourses(pagination.page, search);
  }, []);

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllSessionAllocatedCourses(page + 1, search);
  };
  const getAllSessionAllocatedCourses = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      // search,
      session_id,
    };
    getSessionAllocatedCourses(setData, queryParams, setPagination);
  };

  const toggleRowExpand = (index: number) => {
    const dat = [...data];
    dat[index].isExpanded = !dat[index].isExpanded;
    setData([...dat]);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleOpenAllocateSectionModal = (courseId: number) => {
    setCourseId(courseId);
    setOpenAllocateSectionModal(true);
  };
  const handleOpenAllocateTeacherModal = (courseId: number) => {
    setCourseId(courseId);
    setOpenAllocateTeacherModal(true);
  };

  const goToAddCourses = () => {
    navigate(`${siteRoutes.academicCourseListing}?session_id=${session_id}`);
  };
  const [allocateCourseRoom, setAlocateCourseRoom] = useState<boolean>(false);
  const goToAllocateCourseRoom = () => {
    setAlocateCourseRoom(true);
  };

  return (
    <AcademicSessionManagementListingMain>
      <AcademicSessionManagementListingTop>
        <div className="left">
          <span className="page-heading">Manage Academic Sessions</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.academicCourseListing) && (
            <div className="create-org-btn">
              <button className="lg-rounded-btn" onClick={goToAddCourses}>
                + Add New Courses
              </button>
            </div>
          )}
        </div>
      </AcademicSessionManagementListingTop>

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
                <label htmlFor="">Campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Campus</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Faculty</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Faculty</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Department</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Result Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Result Status</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Enrollments</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Enrolment Status</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Anomalies</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Anomalies</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Teacher CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Teacher</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Teacher</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Associated Section</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Associated Section</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Course ID</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="" id="" />
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
      <AcademicSessionManagementListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
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
                handleSearchChange(e, setSearch, getAllSessionAllocatedCourses)
              }
              onKeyUp={(e) =>
                handleTableSearch(e, getAllSessionAllocatedCourses)
              }
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
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{item.isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.c_title}</div>
                      </td>
                      <td>ES-402</td>
                      <td>BSPAKS-4TH-1M</td>
                      <td>Tabish Farooq</td>
                      <td>--</td>
                      <td>3(3-0)</td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td colSpan={7}>
                          <div className="expanded-content bordered">
                            <div className="particular-info">
                              <span className="title">Campus</span>
                              <span className="info">Rahim Yar Khan</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Students Enrolled</span>
                              <span className="info">25</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Result Status</span>
                              <span className="info">Not Submitted</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Lab Status</span>
                              <span className="status-tile yellow">
                                Inactive
                              </span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Course ID</span>
                              <span className="info">297050</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Class Status</span>
                              <span className="status-tile green">Active</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Thesis Status</span>
                              <span className="status-tile green">Active</span>
                            </div>
                            <div className="particular-info last">
                              <span className="title">Action</span>
                              <div className="table-action-buttons">
                                <div className="action-icon">
                                  <EditTableSvg />
                                </div>
                                <div className="table-action-button">
                                  <button className="green">
                                    Manage Enrollments
                                  </button>
                                </div>
                                <div
                                  className="table-action-button black"
                                  onClick={() =>
                                    handleOpenAllocateSectionModal(item?.id)
                                  }
                                >
                                  <button className="black">
                                    Allocate Section
                                  </button>
                                </div>
                                <div
                                  className="table-action-button black"
                                  onClick={() =>
                                    handleOpenAllocateTeacherModal(item?.id)
                                  }
                                >
                                  <button className="black">
                                    Allocate Teacher
                                  </button>
                                </div>
                                <div className="table-action-button black">
                                  <button className="yellow">
                                    Enrollments Data (CSV)
                                  </button>
                                </div>
                                <div
                                  className="table-action-button purple"
                                  onClick={goToGradeBooks}
                                >
                                  <button className="purple">
                                    Manage Gradebooks
                                  </button>
                                </div>
                                <div
                                  className="table-action-button purple"
                                  onClick={goToGradeSchema}
                                >
                                  <button className="purple">
                                    View Grading Scheme
                                  </button>
                                </div>
                                <div
                                  className="table-action-button purple"
                                  onClick={goToAllocateCourseRoom}
                                >
                                  <button className="red">
                                    Course Room Allocation
                                  </button>
                                </div>
                              </div>{" "}
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
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination onPageChange={onPageChange} {...pagination} />
          {openAllocateSectionModal && (
            <AllocateSection
              setOpen={setOpenAllocateSectionModal}
              course_id={courseId}
            />
          )}
          {openGradeSchemaModal && (
            <GradingSchema setOpen={setOpenGradeSchemaModal} />
          )}
          {openAllocateTeacherModal && (
            <AllocateTeacher
              setOpen={setOpenAllocateTeacherModal}
              course_id={courseId}
            />
          )}
          {allocateCourseRoom && (
            <AllocateCourseRooms
              setOpen={setAlocateCourseRoom}
              course_id={courseId}
            />
          )}
        </Fragment>
      </AcademicSessionManagementListingSection>
    </AcademicSessionManagementListingMain>
  );
};

export default AcademicSessionManagementListing;
