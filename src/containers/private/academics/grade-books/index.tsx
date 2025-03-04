import { FC, Fragment, useEffect, useState } from "react";
import {
  CallTableSvg,
  DarkEyeSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditGreenTableSvg,
  EmailSvg,
  ExcelSvg,
  GreenDownLodadSvg,
  LocationSvg,
  MannageRoomSvg,
  PdfSvg,
  SearchFieldSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  GradeBooksListingMain,
  GradeBooksListingSection,
  GradeBooksListingTop,
  Filters,
  FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TestScheduleDTO } from "utils/helpers/models/testing-service/test-schedule.dto";
import useUtils from "hooks/useUtils";
import useTestingServices from "../../testing-services/useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import useAdmissions from "containers/private/admissions/useHooks";

const GradeBooksListing: FC = ({}) => {
  const navigate = useNavigate();
  const {
    getTestSchedules,
    deleteTestSchedule,
    getTestingCenters,
    updateTestSchedule,
  } = useTestingServices();
  const [search, setSearch] = useState<string>("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [data, setData] = useState<TestScheduleDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [testCenters, setTestCenters] = useState<TestingCenterDTO[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const { hasAccess } = useStore();
  const [filters, setFilters] = useState<any>({
    test_id: "",
    session_id: "",
    test_center_id: "",
    batch: "",
  });
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { getAdmissionEntryTests, getAdmissionSessions } = useAdmissions();
  const columns: string[] = [
    "Grade Book Version",
    "Submitted",
    "Verified",
    "Approved",
    "Acknowledged",
    "Submitted by",

    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.createTestingServicesTestSchedule);
  };

  const goToSeatingPLan = () => {
    navigate(siteRoutes.testingServicesTestScheduleSeatingPlanlist);
  };

  useEffect(() => {
    getAllTestSchedules(pagination.page, search, filters);
    getTestingCenters(setTestCenters);
    getAdmissionEntryTests(setTests);
    getAdmissionSessions(setSessions);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteTestSchedule(id, setData, queryParams, setPagination);
    }
  };

  const toggleRowExpand = (index: number) => {
    (data as any)[index].isDropdownOpen = !(data as any)[index].isDropdownOpen;
    setData([...data]);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllTestSchedules(page + 1, search, filters);
  };
  const getAllTestSchedules = (page: number, search: string, filters: any) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      ...filters,
    };
    getTestSchedules(setData, queryParams, setPagination);
  };

  const goToEditTestSchedule = (id: number) => {
    navigate(`${siteRoutes.createTestingServicesTestSchedule}?id=${id}`);
  };

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const resetFilters = () => {
    for (let key in filters) {
      filters[key] = "";
    }

    setFilters({ ...filters });
    getAllTestSchedules(1, search, filters);
  };

  const handleUpdateScheduleStatus = (
    schedule: TestScheduleDTO,
    index: number
  ) => {
    data[index] = schedule;
    setData([...data]);
    updateTestSchedule(schedule.id, schedule);
  };
  const breadcrumbLinks = [
    { title: "Academics  /", path: "" },
    { title: "Academic Sessions /", path: siteRoutes.academicSessionListing },
    {
      title: "Manage Academic Sessions /",
      path: siteRoutes.academicSessionListing,
    },
    { title: "Grade Book’s", path: siteRoutes.academicGradeBookListing },
  ];

  return (
    <GradeBooksListingMain>
      <GradeBooksListingTop>
        <div className="left">
          <span className="page-heading">Grade Book’s</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn">+ Add New</button>
          </div>
        </div>
      </GradeBooksListingTop>

      <FilterSection className="content-radius-shadow">
        <Filters>
          <div className="filter-fields">
            <div className="input-field">
              <label>Session</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    name="session"
                    value={filters.session}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Session</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray">
                  View Course Grading Scheme
                </button>
                <button className="lg-rounded-btn">Manage Enrollments</button>
              </div>
            </div>
          </div>
          <div className="grade-book-note">
            Note: You can update Course Total Marks OR Enrollment Statuses only
            before submitting Grade Book. If you want to edit mentioned things
            after submission, then you have to un submit Grade Book if its not
            verified and then resubmit it after updating mentioned things.
          </div>
          <div className="grade-book-note">
            Once Grade Book is Submitted and Verified, nothing can be reverted
            or updated.
          </div>
        </Filters>
      </FilterSection>
      <GradeBooksListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllTestSchedules)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllTestSchedules)}
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
              {data.map((schedule, index) => {
                return (
                  <Fragment>
                    <tr>
                      <td>DR1.252</td>
                      <td>
                        <span className="status-tile green">Yes</span>
                      </td>

                      <td>
                        <span className="status-tile green">Yes</span>
                      </td>
                      <td>
                        {" "}
                        <span className="status-tile green">Yes</span>
                      </td>
                      <td>
                        <span className="status-tile green">Yes</span>
                      </td>

                      <td>
                        <div className="mw-100">rashid sttar</div>
                      </td>
                      <td>
                        <div className="action-menu">
                          <div
                            className="menu-icon cp"
                            onClick={() => toggleRowExpand(index)}
                          >
                            <TabPrimaryActionMenu className="icon" />
                          </div>
                          {(schedule as any).isDropdownOpen && (
                            <div className="table-menu-dropdown">
                              <div
                                className="particular-menu cp"
                                onClick={() =>
                                  goToEditTestSchedule(schedule.id)
                                }
                              >
                                <div className="action-icon">
                                  <DarkEyeSvg className="icon" />
                                </div>
                                <span className="title">View Changes</span>
                              </div>
                              <div className="particular-menu cp">
                                <div className="action-icon">
                                  <MannageRoomSvg className="icon" />
                                </div>
                                <span className="title">Download CSV</span>
                              </div>
                              <div className="particular-menu cp">
                                <div className="action-icon">
                                  <GreenDownLodadSvg className="icon" />
                                </div>
                                <span className="title">
                                  Download Award List
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </GradeBooksListingSection>
    </GradeBooksListingMain>
  );
};

export default GradeBooksListing;
