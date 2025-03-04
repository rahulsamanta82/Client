import { FC, Fragment, useState, useEffect } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  StudyPlanCourseListingMain,
  StudyPlanCourseListingSection,
  StudyPlanCourseListingTop,
  StudyPlanCourseListingStatsSection,
} from "./style";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import CreateCourseRoom from "./components/create-study-plan-course";

const StudyPlanCourseListing: FC = () => {
  const [openAddCourseRoomModal, setOpenAddCourseRoomModal] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Sequence No",
    "Course Code",
    "Course Title",
    "Department",
    "Credit Hours",
    "Show On Transcript",
    "Action",
  ];

  const breadcrumbLinks = [
    { title: "Academics /", path: "" },
    {
      title: "Plan of Studies / ",
      path: siteRoutes.academicPlanofStudies,
    },
    {
      title: "Plan of Study Courses ",
      path: siteRoutes.planOfStudyCourseListing,
    },
  ];

  const goToCreateCourse = () => {
    setOpenAddCourseRoomModal(true);
  };
  return (
    <StudyPlanCourseListingMain>
      <StudyPlanCourseListingTop>
        <div className="left">
          <span className="page-heading">Plan of Study Courses</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn black">Validate POS</button>
            <button className="lg-rounded-btn" onClick={goToCreateCourse}>
              Add Course
            </button>
            <button className="lg-rounded-btn gray">Reset Result Cache</button>
            <button className="lg-rounded-btn red">Delete Bulck</button>
          </div>
        </div>
      </StudyPlanCourseListingTop>
      <StudyPlanCourseListingStatsSection className="content-radius-shadow">
        <div className="stats">
          <div className="sats-item">
            <div className="stats-title">Title</div>
            <div className="stats-value"></div>
          </div>
          <div className="sats-item">
            <div className="stats-title">Program</div>
            <div className="stats-value"></div>
          </div>
          <div className="sats-item">
            <div className="stats-title">Total Credit Hours (Theory-Lab)</div>
            <div className="stats-value"></div>
          </div>
          <div className="sats-item">
            <div className="stats-title">Status</div>
            <div className="stats-value"></div>
          </div>
        </div>
      </StudyPlanCourseListingStatsSection>

      <StudyPlanCourseListingSection className="content-radius-shadow">
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
              <Fragment>
                <tr>
                  <td>
                    <div className="table-field">
                      <input type="number" placeholder="2" />
                    </div>
                  </td>
                  <td>
                    <div className="mw-150">CPEN-1522</div>
                  </td>
                  <td>
                    <div className="mw-150">Theory and practice </div>
                  </td>
                  <td>
                    <div className="mw-150">Department of Networking </div>
                  </td>
                  <td>
                    <div className="mw-150">3(3-0) </div>
                  </td>
                  <td>
                    <div className="table-radio-field">
                      <div className="radio">
                        <input type="radio" />
                        <label>Yes</label>
                      </div>
                      <div className="radio">
                        <input type="radio" />
                        <label>No</label>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="mw-150">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <DeleteTableSvg />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <Fragment>
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />

            {openAddCourseRoomModal && (
              <CreateCourseRoom setOpen={setOpenAddCourseRoomModal} />
            )}
          </Fragment>
        </div>
      </StudyPlanCourseListingSection>
    </StudyPlanCourseListingMain>
  );
};

export default StudyPlanCourseListing;
