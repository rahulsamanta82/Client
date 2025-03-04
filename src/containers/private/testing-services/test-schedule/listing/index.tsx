import { FC, Fragment, useEffect, useState } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditGreenTableSvg,
  EmailSvg,
  ExcelSvg,
  LocationSvg,
  MannageRoomSvg,
  PdfSvg,
  SearchFieldSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  TestCenterListingMain,
  TestCenterListingSection,
  TestCenterListingTop,
  FilterHeader,
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
import useTestingServices from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import useAdmissions from "containers/private/admissions/useHooks";

const ListingTestSchedule: FC = ({ }) => {
  const navigate = useNavigate();
  const { getTestSchedules, deleteTestSchedule, getTestingCenters, updateTestSchedule } = useTestingServices();
  const [search, setSearch] = useState<string>("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [testCenters, setTestCenters] = useState<TestingCenterDTO[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1
  });

  const { hasAccess } = useStore();
  const [filters, setFilters] = useState<any>({
    test_id: '',
    session_id: '',
    test_center_id: '',
    batch: ''
  })
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { getAdmissionEntryTests, getAdmissionSessions } = useAdmissions();
  const columns: string[] = [
    "ID",
    "Test Name",
    "Start Date",
    "End Date",
    "Description",
    "Status",
    "Applicants",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.createTestingServicesTestSchedule);
  };

  const goToSeatingPLan = (id:number) => {
    // navigate(siteRoutes.testingServicesTestScheduleSeatingPlanlist);
    navigate(`${siteRoutes.testingServicesTestScheduleSeatingPlanlist}?schedule_id=${id}`);
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
  }

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
      ...filters
    };
    getTestSchedules(setData, queryParams, setPagination);
  };

  const goToEditTestSchedule = (id: number) => {
    navigate(`${siteRoutes.createTestingServicesTestSchedule}?id=${id}`);
  }

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  const resetFilters = () => {
    for (let key in filters) {
      filters[key] = '';
    }

    setFilters({ ...filters });
    getAllTestSchedules(1, search, filters);
  }

  const handleUpdateScheduleStatus = (schedule: TestScheduleDTO, index: number) => {
    data[index] = schedule;
    setData([...data]);
    updateTestSchedule(schedule.id, schedule);
  }

  return (
    <TestCenterListingMain>
      <TestCenterListingTop>
        <div className="left">
          <span className="page-heading">Schedules</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createTestingServicesTestSchedule) && (
            <div className="create-org-btn">
              <button onClick={goToCreateTestCenter} className="lg-rounded-btn">
                + Add New
              </button>
            </div>
          )}
        </div>
      </TestCenterListingTop>

      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={openFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {openFilterDropdown && (
          <Filters>
            <div className="filter-fields">
              <div className="input-field">
                <label>Session</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="session" value={filters.session} onChange={handleFilterChange}>
                      <option value="">Select Session</option>
                      {sessions.map((session, index) => {
                        return <option value={session.id} key={index}>{session.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="test_id" value={filters.test_id} onChange={handleFilterChange}>
                      <option value="">Select Name</option>
                      {tests.map((test: any, index: number) => {
                        return <option value={test.id} key={index}>{test.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test Batch</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="batch" value={filters.batch} onChange={handleFilterChange}>
                      <option value="">Select Batch</option>
                      {[1, 1, 1, 1, 1].map((value, index) => {
                        return <option value={index + 1}>{index + 1}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test center</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="test_center_id" value={filters.test_center_id} onChange={handleFilterChange}>
                      <option value="">Select Center</option>
                      {testCenters.map((center, index) => {
                        return <option value={center.id} key={index}>{center.name}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={resetFilters}>Reset</button>
                <button className="lg-rounded-btn" onClick={() => getAllTestSchedules(1, search, filters)}>Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>
      <TestCenterListingSection className="content-radius-shadow">
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
              onChange={(e) => handleSearchChange(e, setSearch, getAllTestSchedules)}
              onKeyUp={e => handleTableSearch(e, getAllTestSchedules)}
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
                  <Fragment key={index}>
                    <tr>
                      <td>
                        {schedule.id}
                      </td>
                      <td>
                        {schedule?.test?.title}
                      </td>
                      <td>
                        {schedule.start_date}
                      </td>
                      <td>
                        {schedule.end_date}
                      </td>
                      <td>
                        <div className="mw-150">{schedule.description}</div>
                      </td>
                      <td>
                        <div className="table-radio-field">
                          <div className="radio">
                            <label htmlFor={`is-active-yes-${index}`}>
                              Active
                            </label>
                            <input type="radio" checked={schedule.is_active == 1} onChange={() => handleUpdateScheduleStatus({ ...schedule, is_active: 1 }, index)} />
                          </div>
                          <div className="radio">
                            <label htmlFor={`is-active-no-${index}`}>
                              Non-Active
                            </label>
                            <input type="radio" checked={schedule.is_active == 0} onChange={() => handleUpdateScheduleStatus({ ...schedule, is_active: 0 }, index)} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="mw-100">20</div>
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
                              <div className="particular-menu cp" onClick={() => goToEditTestSchedule(schedule.id)}>
                                <div className="action-icon">
                                  <EditGreenTableSvg className="icon" />
                                </div>
                                <span className="title">Edit</span>
                              </div>
                              <div className="particular-menu cp">
                                <div className="action-icon">
                                  <MannageRoomSvg className="icon" />
                                </div>
                                <span
                                  className="title"
                                  onClick={() => goToSeatingPLan(schedule.id)}
                                >
                                  Manage Seating Plans
                                </span>
                              </div>
                              <div className="particular-menu cp">
                                <div className="action-icon">
                                  <CallTableSvg className="icon" />
                                </div>
                                <span className="title">Call</span>
                              </div>
                              <div className="particular-menu cp">
                                <div className="action-icon">
                                  <EmailSvg className="icon" />
                                </div>
                                <span className="title">Email</span>
                              </div>
                              <div className="particular-menu cp">
                                <div className="action-icon">
                                  <LocationSvg className="icon" />
                                </div>
                                <span className="title">Location</span>
                              </div>

                              <div className="particular-menu cp" onClick={() => handleDelete(schedule.id)}>
                                <div className="action-icon">
                                  <DeleteTableSvg className="icon" />
                                </div>
                                <span className="title">Delete</span>
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
          <Pagination
            onPageChange={onPageChange}
            {...pagination}
          />
        </Fragment>
      </TestCenterListingSection>
    </TestCenterListingMain>
  );
};

export default ListingTestSchedule;
