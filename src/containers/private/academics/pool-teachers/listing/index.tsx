import { FC, Fragment, useEffect, useState } from "react";
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
  PoolTeachersListingMain,
  PoolTeachersListingSection,
  PoolTeachersListingTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import { TestingCenterRoomDTO } from "utils/helpers/models/testing-service/testing-center-room.dto";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import AddEntryTest from "./components/add-teacher-training";
import AddQualification from "./components/add-fuculty-visitors";
import AddTrainingTeacher from "./components/add-teacher-training";
import AddFacultyVisitors from "./components/add-fuculty-visitors";

const PoolTeachersListing: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "Common Courses Pools / ",
      path: siteRoutes.commonCoursesPoolsListing,
    },
    { title: "Pool Teachers (ICT SKILLS)", path: siteRoutes.ePortalLogin },
  ];
  const columns: string[] = ["Name", "CNIC", "Job Status", "Status", "Action"];
  const navigate = useNavigate();
  const [data, setData] = useState<TestingCenterRoomDTO[]>([]);
  const [center, setCenter] = useState<TestingCenterDTO>(
    new TestingCenterDTO()
  );
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();
  const params = getQueryParams();

  useEffect(() => {
    // getAllTestingCenterRooms(pagination.page, search);
    // getTestingCenterById(params?.id, center, setCenter);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      // deleteTestingCenterRoom(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllTestingCenterRooms(page + 1, search);
  };
  const getAllTestingCenterRooms = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    // getTestingCenterRooms(setData, queryParams, setPagination);
  };

  const goToEnrollTeacher = () => {
    navigate(siteRoutes.enrollPoolTeacher);
  };

  const [openTrainingModal, setOpenTrainingModal] = useState<boolean>(false);
  const [openFacultyModal, setOpenFacultyModal] = useState<boolean>(false);

  const goToVisitingFuculty = () => {
    setOpenFacultyModal(true);
  };

  const goToTeacherTraining = () => {
    setOpenTrainingModal(true);
  };

  return (
    <PoolTeachersListingMain>
      <PoolTeachersListingTop>
        <div className="left">
          <span className="page-heading">Pool Teachers (ICT SKILLS)</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <button className="lg-rounded-btn" onClick={goToTeacherTraining}>
            + Add Teachers From Training
          </button>
          <button className="lg-rounded-btn" onClick={goToVisitingFuculty}>
            + Add Visiting Faculty
          </button>
        </div>
      </PoolTeachersListingTop>
      <PoolTeachersListingSection
        isTableOverflowing={false}
        className="content-radius-shadow"
      >
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
                handleSearchChange(e, setSearch, getAllTestingCenterRooms)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllTestingCenterRooms)}
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
              {[1, 1, 1, 1, 1].map((room, index) => {
                return (
                  <tr>
                    <td>Associate Lecture</td>
                    <td>31102-1234567-9</td>
                    <td>
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
                    </td>
                    <td>Non-Teaching</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>
                        <div
                          className="table-action-button"
                          onClick={goToEnrollTeacher}
                        >
                          <button className="black">Enroll Course</button>
                        </div>
                        <div className="action-icon">
                          <DeleteTableSvg />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination onPageChange={onPageChange} {...pagination} />
          {openTrainingModal && (
            <AddTrainingTeacher setOpen={setOpenTrainingModal} />
          )}
          {openFacultyModal && (
            <AddFacultyVisitors setOpen={setOpenFacultyModal} />
          )}
        </Fragment>
      </PoolTeachersListingSection>
    </PoolTeachersListingMain>
  );
};

export default PoolTeachersListing;
