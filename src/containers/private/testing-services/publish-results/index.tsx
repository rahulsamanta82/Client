import { FC, Fragment, useState,useEffect } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadPrimaryTableSvg,
  EditGreenTableSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
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
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { Navigate, useNavigate } from "react-router-dom";
import useTestingServices from "../useHooks";
import useUtils from "hooks/useUtils";
import useAdmission from "../../admissions/useHooks";

interface StudentRegListingProps {}

const PublishTestResults: FC = ({}) => {
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [batch, setBatch] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [testCenters, setTestCenters] = useState<any[]>([]);
  
  const { hasAccess } = useStore();
  const [search, setSearch] = useState("");
  const { getDateFromDateTime } = useUtils();

  const { getApplicants, getBatch, getTestingCenters ,getPublishResult} = useTestingServices();
  const { getAdmissionSessions, getAdmissionEntryTests } = useAdmission();

  const {
    isComponentVisible: showDropdownMenu,
    setIsComponentVisible: setShowDropdownMenu,
    ref: dropdownMenuRef,
  } = useComponentVisible(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Apply date",
    "Candidate  Name",
    "Father Name",
    "CNIC",
    "Gender",
    "PHD",
    "Total Marks",
    "Obtained Marks",
    "Is Publish",
  ];

  const gender: any[] = [
    { title: "Male" },
    { title: "Female" },
    { title: "Others" },
  ];

  const challanStatuses: any[] = [
    { id: 1, title: "Verified" },
    { id: 2, title: "Pending" },
    { id: 3, title: "Rejected" }, // Example of another status if needed
  ];
  const obtMarksFilter: any[] = [
    {  title: ">=" ,value: "gteq", },
    {  title: "<=" ,value: "lteq"},
    ];
  const [filters, setFilters] = useState<any>({
    publish_res: "",
    session_id: "",
    batch: "",
    test_id: "",
    gender_name: "",
    verify_status: "",
    ob_marks: "",
    operator: "",
  });

  const toggleRowExpand = (index: number) => {
    const dat = [...data];
    dat[index].isExpanded = !dat[index].isExpanded;
    setData([...dat]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const toggleActionDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.TestingServicesTestCentercreate);
  };

  useEffect(() => {
    // getAllApplicants(pagination.page, search);
     getAllPublishResult(pagination.page, search);

    getAdmissionSessions(setSessions);
    getBatch(setBatch);
    getAdmissionEntryTests(setTests);
    getTestingCenters(setTestCenters)
  }, []);

  const getAllPublishResult = (page: number, search: string, filters: any = {}) => {
    const queryParams = {
      // per_page: pagination.per_page,
      // page,
      search,
      ...filters
    };
    getPublishResult(setData, queryParams, setPagination);

  };
console.log(data);

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  const onSubmitFilters = () => {
    const updatedFilters = {
      ...filters,        // Spread the existing filters
      publish_res: "1",  // Set publish_res to "1"
    };
  
    // Pass the updated filters to getAllPublishResult
    getAllPublishResult(1, search, updatedFilters);
    // getAllPublishResult(1, search, filters);
  }

  const onClearFilters = () => {
    for (let key in filters) {
      filters[key] = '';
    }
    setFilters({ ...filters });
    getAllPublishResult(1,  filters ,);
  }
  console.log(data);
  

  return (
    <TestCenterListingMain>
      <TestCenterListingTop>
        <div className="left">
          <span className="page-heading">Students Mark Sheet</span>
          <Breadcrumb />
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
                  <select value={filters.session_id} onChange={handleFilterChange} name="session_id">
                      <option value="">Select Session</option>
                      {sessions.map((session, index) => {
                        return <option value={session.id} key={index}>{session.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test Batch</label>
                <div className="field-wrap">
                  <div className="field">
                  <select value={filters.batch} onChange={handleFilterChange} name="batch">
                      <option value="">Select Test Batch</option>
                      {batch.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test Name</label>
                <div className="field-wrap">
                  <div className="field">
                  <select value={filters.test_id} onChange={handleFilterChange} name="test_id">
                      <option value="">Select name</option>
                      {tests.map((test, index) => {
                        return <option value={test.id} key={index}>{test.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Gender</label>
                <div className="field-wrap">
                  <div className="field">
                  <select value={filters.gender_name} onChange={handleFilterChange} name="gender_name">
                      <option value="">Select Gender</option>
                      {gender.map((item, index) => {
                        return <option value={item.title} key={index}>{item.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Challan Status</label>
                <div className="field-wrap">
                  <div className="field">
                  <select value={filters.verify_status} onChange={handleFilterChange} name="verify_status">
                      <option value="">Select Status</option>
                      {challanStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Obtained Marks Filter</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.operator} onChange={handleFilterChange} name="operator">
                      <option value="">None</option>
                      {obtMarksFilter.map((filter) => (
                        <option key={filter.id} value={filter.id}>
                          {filter.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Obtained marks</label>
                <div className="field-wrap">
                  <div className="field">
                  <input type="text" name="ob_marks" id="" value={filters.ob_marks} onChange={handleFilterChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
              <button className="lg-rounded-btn gray" onClick={onClearFilters}>Reset</button>
              <button className="lg-rounded-btn" onClick={onSubmitFilters}>Publish Result for filter record</button>
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
              onChange={(e) => setSearch(e.target.value)}
              // onKeyUp={handleSearch}
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
              {data?.map((item: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${item.isExpanded && "opened"}`}>
                      <td>
                        <div className="mw-150">{getDateFromDateTime(item?.apply_date)}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.full_name}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.father_name}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.cnic}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.gender_name}</div>
                      </td>
                      <td>
                        <div className="mw-150"> {item?.is_phd === 1 ? item?.phd_program : null}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.total_marks}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.ob_marks}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.is_publish}</div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
        </Fragment>
      </TestCenterListingSection>
    </TestCenterListingMain>
  );
};

export default PublishTestResults;
