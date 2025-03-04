import { FC, Fragment, useState, useEffect } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
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
  StudentRegListingMain,
  StudentRegListingSection,
  StudentRegListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import useTestingServices from "../useHooks";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useUtils from "hooks/useUtils";
import useAdmission from "../../admissions/useHooks";




const ApplicantList: FC = ({ }) => {
  const [data, setData] = useState<any[]>([
    { isExpanded: false },
    { isExpanded: false },
  ]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [batch, setBatch] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [testCenters, setTestCenters] = useState<any[]>([]);



  const { hasAccess } = useStore();
  const { getApplicants, getBatch, getTestingCenters } = useTestingServices();
  const { getAdmissionSessions, getAdmissionEntryTests } = useAdmission();

  const [search, setSearch] = useState("");
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
    "",
    "Challan#",
    "Candidate Name",
    "Father Name",
    "CNIC",
    "Gender",
    "Test Name",
    "Description",
    "Centre",
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

  const [filters, setFilters] = useState<any>({
    session_id: "",
    test_batch: "",
    test_id: "",
    gender: "",
    challan_status: "",
    test_center_id: "",
    obtained_marks: "",
    roll_no: "",
    cnic: ""
  });

  const toggleRowExpand = (index: number) => {
    const dat = [...data];
    dat[index].isExpanded = !dat[index].isExpanded;
    setData([...dat]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const toggleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };
  const { handleSearchChange, handleTableSearch, createQuery } = useUtils();
  useEffect(() => {
    getAllApplicants(pagination.page, search);
    getAdmissionSessions(setSessions);
    getBatch(setBatch);
    getAdmissionEntryTests(setTests);
    getTestingCenters(setTestCenters)
  }, []);

  const getAllApplicants = (page: number, search: string, filters: any = {}) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      ...filters
    };
    getApplicants(setData, queryParams, setPagination);

  };
console.log(data);

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  const onSubmitFilters = () => {
    getAllApplicants(1, search, filters);
  }

  const onClearFilters = () => {
    for (let key in filters) {
      filters[key] = '';
    }
    setFilters({ ...filters });
    getAllApplicants(1, search, filters);
  }

  return (
    <StudentRegListingMain>
      <StudentRegListingTop>
        <div className="left">
          <span className="page-heading">Candidate Applied List</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn">
              + Download LMS CSV Format
            </button>
          </div>
        </div>
      </StudentRegListingTop>

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
                    <select value={filters.batch_id} onChange={handleFilterChange} name="batch_id">
                      <option value="">Select Test Batch</option>
                      {batch.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Test</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.test_id} onChange={handleFilterChange} name="test_id">
                      <option value="">Select Test</option>
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
                    <select value={filters.gender} onChange={handleFilterChange} name="gender">
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
                    <select value={filters.challan_status} onChange={handleFilterChange} name="challan_status">
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
                <label>Test Centre</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.test_center_id} onChange={handleFilterChange} name="test_center_id">
                    <option>Select Center</option>
                      {testCenters.map((center, index) => {
                        return <option value={center.id} key={index}>{center.name}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>Obtained marks less or equal to</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="obtained_marks" id="" value={filters.obtained_marks} onChange={handleFilterChange}/>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Roll no</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="roll_no" id="" value={filters.roll_no} onChange={handleFilterChange} />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="cnic" id="" value={filters.cnic} onChange={handleFilterChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={onClearFilters}>Reset</button>
                <button className="lg-rounded-btn" onClick={onSubmitFilters}>Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>
      <StudentRegListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadStudentRegPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadStudentRegExcel) && (
              <div className="export-btn">
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            )}
          </div>
          <div className="table-search-field">
            <span className="search-icon">
              <SearchFieldSvg className="icon" />
            </span>
            <input
              type="search"
              placeholder="Search"
              value={search}
              // onChange={(e) => setSearch(e.target.value)}
              onChange={(e) =>
                handleSearchChange(e, setSearch, getAllApplicants)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllApplicants)}
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
                        <div className="mw-150">{item?.ac_challan}</div>
                      </td>
                      <td>
                        <div className="mw-100">{item?.user?.name}</div>
                      </td>
                      <td>
                        <div className="mw-100">Asif Nadeem</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.user?.cnic}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.user?.gender}</div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.test_schedule?.test?.title}</div>
                      </td>
                      <td>
                        <div className="mw-150">
                          {item?.test_schedule?.description} - {item?.test_schedule?.batch}
                        </div>
                      </td>
                      <td>
                        <div className="mw-150">{item?.test_center?.name}</div>
                      </td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={7}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Centre Name</span>
                              <span className="info">
                                {item?.test_center?.name}
                              </span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Apply Date</span>
                              <span className="info">{item?.test_schedule?.start_date}</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Test Date</span>
                              <div className="info">
                                <span className="status">{item?.test_schedule?.test_date}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Challan Status</span>
                              <div className="info">
                                <span className="status-tile green">{item?.verify_status}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Total Marks</span>
                              <div className="info">
                                <span className="status">{item?.total_marks}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Obtained Marks</span>
                              <div className="info">
                                <span className="status">{item?.obt_marks}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  <div className="action-button">
                                    <button className="result-card-btn">
                                      Result Card
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="additional-information-btn">
                                      Result Additional Information
                                    </button>
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
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
        </Fragment>
      </StudentRegListingSection>
    </StudentRegListingMain>
  );
};

export default ApplicantList;
