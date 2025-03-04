import { FC, Fragment, useEffect, useState } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditGreenTableSvg,
  EditTableSvg,
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
  FilterHeader,
  Filters,
  FilterSection,
  OvertimeManualEntryListingMain,
  OvertimeManualEntryListingSection,
  OvertimeManualEntryListingTop,
} from "./style";
import useStore from "hooks/useStore";
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
import AddEmployes from "./components/add-employes";

const OvertimeManualEntryListing: FC = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    {
      title: "Overtime Manual Entry",
      path: siteRoutes.overtimeManualEntryListing,
    },
  ];
  const navigate = useNavigate();
  // const { getTestSchedules, deleteTestSchedule, getTestingCenters, updateTestSchedule } = useTestingServices();
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
    "Emp No",
    "Name",
    "Department",
    "Designation",
    "Overtime Hours",
    "Work Days",
    "Remarks",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.createTestingServicesTestSchedule);
  };

  const goToSeatingPLan = (id: number) => {
    // navigate(siteRoutes.testingServicesTestScheduleSeatingPlanlist);
    navigate(
      `${siteRoutes.testingServicesTestScheduleSeatingPlanlist}?schedule_id=${id}`
    );
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
    // getTestSchedules(setData, queryParams, setPagination);
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
    // updateTestSchedule(schedule.id, schedule);
  };

  const [addEmployes, setAddEmployes] = useState<boolean>(false);
  const goToAddEmployes = () => {
    setAddEmployes(true);
  };

  return (
    <OvertimeManualEntryListingMain>
      <OvertimeManualEntryListingTop>
        <div className="left">
          <span className="page-heading">Overtime Manual Entry</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-btn" onClick={goToAddEmployes}>
            <button className="lg-rounded-btn">+ Add Employees</button>
          </div>
        </div>
      </OvertimeManualEntryListingTop>

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
                <label>Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="session"
                      value={filters.session}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Department</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={resetFilters}>
                  Reset
                </button>
                <button
                  className="lg-rounded-btn"
                  onClick={() => getAllTestSchedules(1, search, filters)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <OvertimeManualEntryListingSection className="content-radius-shadow">
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
              {[1, 1, 1, 1, 1].map((item, index) => {
                return (
                  <tr key={index}>
                    <td>0{index + 1}</td>
                    <td>
                      <div className="mw-150">M. Zahid Hussain</div>
                    </td>
                    <td>
                      <div className="mw-150">Department of Zoology</div>
                    </td>
                    <td>
                      <div className="mw-100">Associate Professor</div>
                    </td>
                    <td>05</td>
                    <td>01</td>
                    <td>-</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination onPageChange={onPageChange} {...pagination} />
          {addEmployes && <AddEmployes setOpen={setAddEmployes} />}
        </Fragment>
      </OvertimeManualEntryListingSection>
    </OvertimeManualEntryListingMain>
  );
};

export default OvertimeManualEntryListing;
