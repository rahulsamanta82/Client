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
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  LeaveCancellationListingMain,
  LeaveCancellationListingSection,
  LeaveCancellationListingTop,
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
// import useTestingServices from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import useAdmissions from "containers/private/admissions/useHooks";

const LeaveCancellationListing: FC = ({ }) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    { title: "Leave Cancellation", path: siteRoutes.leaveCancellationListing },
  ]
  const navigate = useNavigate();
  // const { getTestSchedules, deleteTestSchedule, getTestingCenters, updateTestSchedule } = useTestingServices();
  const [search, setSearch] = useState<string>("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([
    { isExpanded: false },
    { isExpanded: false },
    { isExpanded: false },
    { isExpanded: false },
  ]);
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
    "",
    "Sr#",
    "Employer Detail",
    "Leave Type",
    "Leave Range",
    "Days",
    "Status",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.createTestingServicesTestSchedule);
  };

  const goToSeatingPLan = (id: number) => {
    // navigate(siteRoutes.testingServicesTestScheduleSeatingPlanlist);
    navigate(`${siteRoutes.testingServicesTestScheduleSeatingPlanlist}?schedule_id=${id}`);
  };

  // useEffect(() => {
  //   getAllTestSchedules(pagination.page, search, filters);
  //   getTestingCenters(setTestCenters);
  //   getAdmissionEntryTests(setTests);
  //   getAdmissionSessions(setSessions);
  // }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      // deleteTestSchedule(id, setData, queryParams, setPagination);
    }
  };

  const toggleRowExpand = (index: number) => {
    (data as any)[index].isExpanded = !(data as any)[index].isExpanded;
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
    // getTestSchedules(setData, queryParams, setPagination);
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
    // updateTestSchedule(schedule.id, schedule);
  }

  return (
    <LeaveCancellationListingMain>
      <LeaveCancellationListingTop>
        <div className="left">
          <span className="page-heading">Leave Cancellation</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </LeaveCancellationListingTop>

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
                <label>Employee</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="session" value={filters.session} onChange={handleFilterChange}>
                      <option value="">Select Employee</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Leave Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="test_id" value={filters.test_id} onChange={handleFilterChange}>
                      <option value="">All Leave</option>
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
      <LeaveCancellationListingSection className="content-radius-shadow">
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
              {data.map((item, index) => {
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
                      <td>0{index}</td>
                      <td>
                        <div className="emp-detail">
                          <div className="name">
                            mr. muhammad ali
                          </div>
                          <div className="designation">
                            Assistant Director IT (BPS-17)
                          </div>
                          <div className="designation">
                            Directorate of IT
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="leave-type">
                          <div className="type">
                            Casual Leave
                          </div>
                          <div className="dated">
                            Request on 02-12-2024
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="mw-150">
                          2024-08-24 - 2024-08-28
                        </div>
                      </td>
                      <td>2</td>
                      <td>
                        <span className="status-tile">
                          Approved
                        </span>
                      </td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={6}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-buttons">
                                  <div className="table-action-button">
                                    <button className="red">Cancel Leave</button>
                                  </div>
                                  <div className="table-action-button">
                                    <button className="yellow">Range Change</button>
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
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination
            onPageChange={onPageChange}
            {...pagination}
          />
        </Fragment>
      </LeaveCancellationListingSection>
    </LeaveCancellationListingMain>
  );
};

export default LeaveCancellationListing;
