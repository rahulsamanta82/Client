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
  TableBlackRightArrowSvg,
  TableDownloadPrimarySvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  AdmissionApplicantsListingMain,
  AdmissionApplicantsListingSection,
  AdmissionApplicantsListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useAdmissions from "../useHooks";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

interface AdmissionApplicantsListingProps {}

const AdmissionApplicantsListing: FC<
  AdmissionApplicantsListingProps
> = ({}) => {
  const {
    getStudentApplicants,
    getCampusList,
    getStudenApplicantsFilterData,
    getStudentProgram,
    getStudentFilterData,
  } = useAdmissions();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const [search, setSearch] = useState("");
  const [studentData, setStudentData] = useState<any[]>([]);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const { hasAccess } = useStore();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "",
    "CNIC",
    "Name",
    "Father Name",
    "Father CNIC",
    "Application No.",
    "Fee Status",
  ];

  const toggleRowExpand = (index: number) => {
    const updatedStudentData = [...studentData];
    updatedStudentData[index].isExpanded =
      !updatedStudentData[index].isExpanded;
    setStudentData(updatedStudentData);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const [filters, setFilters] = useState<any>({
    program: "",
    session_year: "",
    session_type: "",
    is_eligible: "",
    program_code: "",
    domicile: "",
    gender: "",
    interview: "",
    category: "",
    cat_slug: "",
    academic_session: "",
    quota: "",
    fee_status: "",
    religion: "",
    is_hafiz: "",
    campus: "",
    admission_status: "",
    app_no: "",
    name: "",
    city_id: "",
    hostel_facility: "",
    cnic: "",
  });
  const [selected, setSelected] = useState<any>({
    category: "",
    academic_session: "",
  });

  const [campus, setCampus] = useState<any[]>([]);
  const [data, setData] = useState<any>({});
  const [programs, setPrograms] = useState<any>({});

  const getAllStudentApplicants = (page: number = 1) => {
    const filterOptions = { ...filters };

    for (let key in filterOptions) {
      if (!filters[key]) {
        delete filterOptions[key];
      }
    }

    const queryParams = {
      per_page: pagination.per_page,
      page,
      ...filterOptions,
    };

    getStudentApplicants((data: any) => {
      const studentsWithExpandState = data.details.map((student: any) => ({
        ...student,
        isExpanded: false,
      }));
      setStudentData(studentsWithExpandState);
    }, queryParams);
  };

  const getAllprograms = () => {
    const queryParams = {
      category: "",
      academic_session: "",
    };

    getStudentProgram(setPrograms, queryParams);
  };
  const [selectedReligion, setSelectedReligion] = useState("Islam");
  const [isHafiz, setIsHafiz] = useState("");

  const handleReligionChange = (event: any) => {
    setSelectedReligion(event.target.value);
  };

  const handleHafizChange = (event: any) => {
    setIsHafiz(event.target.value);
  };

  const shouldShowHafizField =
    selectedReligion === "Islam" ||
    (selectedReligion === "All" && isHafiz === "");

  useEffect(() => {
    getAllStudentApplicants();
    getCampusList(setCampus);
    getAllprograms();
    getStudentFilterData(setData);
  }, []);

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      getAllStudentApplicants();
    }
  };

  const handleApplyFilters = () => {
    getAllStudentApplicants();
  };
  console.log(programs);
  return (
    <AdmissionApplicantsListingMain>
      <AdmissionApplicantsListingTop>
        <div className="left">
          <span className="page-heading">Applicant Listing</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.admissionStudentDownloadListing) && (
            <div className="download-list-button">
              <button className="lg-rounded-btn">Download List</button>
            </div>
          )}
        </div>
      </AdmissionApplicantsListingTop>

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
                <label>Campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="campus" onChange={handleFilterChange}>
                      <option value="">All Campus</option>
                      {campus?.map((item: any, index: number) => {
                        return <option>{item?.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Session Year</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="session_year" onChange={handleFilterChange}>
                      <option value="">All Types</option>
                      {data?.academic_sessions?.map(
                        (item: any, index: number) => {
                          return <option value="">{item?.session_year}</option>;
                        }
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Session type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="session_type" onChange={handleFilterChange}>
                      <option value="">All Types</option>
                      {data?.academic_sessions?.map(
                        (item: any, index: number) => {
                          return <option value="">{item?.session_type}</option>;
                        }
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Academic Session</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="academic_session"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Session</option>
                      {data?.academic_sessions?.map(
                        (item: any, index: number) => {
                          return (
                            <option value="">{item?.session_title}</option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Category</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="category" onChange={handleFilterChange}>
                      <option value="">Select Category</option>
                      {data?.certificate_levels?.map(
                        (item: any, index: number) => {
                          return <option value="">{item?.title}</option>;
                        }
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Program</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="program" onChange={handleFilterChange}>
                      <option value="">All Programs</option>
                      {programs?.programs?.map((item: any, index: number) => {
                        return <option>{item?.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Processing Fee Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="fee_status" onChange={handleFilterChange}>
                      <option value="-1">All Status</option>
                      <option value="1">Submitted</option>
                      <option value="0">In-Process</option>
                      <option value="">Not Submitted</option>
                      <option value="2">Invalid</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* commit from backend */}
              {/* <div className="input-field">
                <label>Admission Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      id="admission_status"
                      name="admission_status"
                      onChange={handleFilterChange}
                    >
                      <option value="-1">All Status</option>
                      <option value="not-in-meritlist-yet">
                        Not in Merit list yet
                      </option>
                      <option value="in-meritlist">
                        In Merit list, Admission not Confirm
                      </option>
                      <option value="admission-confirm">
                        Admission Confirm
                      </option>
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="input-field">
                <label>Admission Eligibility</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="is_eligible"
                      id="is_eligible"
                      onChange={handleFilterChange}
                    >
                      <option value="-1">All</option>
                      <option value="1">Eligible</option>
                      <option value="0">Not Eligible</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>APP NO</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      name="app_no"
                      id=""
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      name="name"
                      id=""
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Domicile City</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="domicile" onChange={handleFilterChange}>
                      <option value="">All Districts</option>
                      {data?.domicile?.map((item: any, index: number) => {
                        return <option value="">{item?.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>City Tehsil</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="city_id" onChange={handleFilterChange}>
                      <option value="">All City</option>
                      {data?.cities?.map((item: any, index: number) => {
                        return <option value="">{item?.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Gender</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="gender" onChange={handleFilterChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Quota</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="quota" onChange={handleFilterChange}>
                      <option value="">All</option>
                      {data?.quotas?.map((item: any, index: number) => {
                        return <option value="">{item?.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Religion</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      value={selectedReligion}
                      name="religion"
                      onChange={handleReligionChange}
                    >
                      <option value="">All</option>
                      <option value="Islam">Islam</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Judism">Judism</option>
                      <option value="Christian">Christian</option>
                    </select>
                  </div>
                </div>
              </div>
              {shouldShowHafizField && (
                <div className="input-field">
                  <label>Hafiz-e-Quran</label>
                  <div className="field-wrap">
                    <div className="field">
                      <select
                        name="is_hafiz"
                        value={isHafiz}
                        onChange={handleHafizChange}
                      >
                        <option value="">All</option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="input-field">
                <label>Hostel facility</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      name="hostel_facility"
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      onChange={handleFilterChange}
                      name="cnic"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                  // onClick={handleResetFilters}
                >
                  Reset
                </button>
                <button className="lg-rounded-btn" onClick={handleApplyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <AdmissionApplicantsListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.admissionStudentDownloadPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}
            {hasAccess(sitePermissions.admissionStudentDownloadExcel) && (
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
              {studentData.map((item: any, index: number) => (
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
                      <div className="mw-150">{item?.cnic}</div>
                    </td>
                    <td>
                      <div className="mw-100">{item?.name}</div>
                    </td>
                    <td>
                      <div className="mw-100">{item?.father_name}</div>
                    </td>
                    <td>
                      <div className="mw-150">{item?.father_cnic || "-"}</div>
                    </td>
                    <td>
                      <div className="mw-150">{item?.app_no || "-"}</div>
                    </td>
                    <td>
                      {item?.fee_status === 0 && (
                        <span className="status-tile yellow">Unpaid</span>
                      )}
                      {item?.fee_status === 1 && (
                        <span className="status-tile green">Paid</span>
                      )}
                    </td>
                  </tr>

                  {item.isExpanded && (
                    <tr>
                      <td></td>
                      <td colSpan={5}>
                        <div className="expanded-content">
                          {/* Expanded Row Details */}
                          <div className="particular-info">
                            <span className="title">Registration Date</span>
                            <span className="info">{item?.app_date}</span>
                          </div>
                          <div className="particular-info">
                            <span className="title">Merit</span>
                            <span className="info">{item?.merit}</span>
                          </div>
                          {/* <div className="particular-info">
                            <span className="title">Challan No. </span>
                            <div className="info">
                              <span className="status">
                                {item?.fee_challan_number
                                  ? item.fee_challan_number
                                  : "-"}
                              </span>
                            </div>
                          </div> */}
                          <div className="particular-info">
                            <span className="title">Program</span>
                            <div className="info">
                              <span className="status">{item?.program}</span>
                            </div>
                          </div>
                          {/* commit by backend */}
                          {/* <div className="particular-info">
                            <span className="title">Quota</span>
                            <div className="info">
                              <span className="status">
                                {item?.quota ? item.quota : "-"}
                              </span>
                            </div>
                          </div> */}

                          {/* <div className="particular-info">
                            <span className="title">City</span>
                            <div className="info">
                              <span className="status">{item?.p_city}</span>
                            </div>
                          </div> */}
                          <div className="particular-info">
                            <span className="title">Domicile</span>
                            <div className="info">
                              <span className="status">{item?.domicile}</span>
                            </div>
                          </div>

                          <div className="particular-info">
                            <span className="title"> Campus</span>
                            <div className="info">
                              <span className="status">
                                {item?.campus_title}
                              </span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Session Year</span>
                            <div className="info">
                              <span className="status">
                                {item?.session_year}
                              </span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Session Type</span>
                            <div className="info">
                              <span className="status">
                                {item?.session_type}
                              </span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Academic Session</span>
                            <div className="info">
                              <span className="status">
                                {item?.session_title}
                              </span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Category</span>
                            <div className="info">
                              <span className="status">{item?.category}</span>
                            </div>
                          </div>
                          {/* commit by backend */}
                          {/* <div className="particular-info">
                            <span className="title">Admission Status</span>
                            <div className="info">
                              <span className="status">
                                {item?.document_status
                                  ? item.document_status
                                  : "-"}
                              </span>
                            </div>
                          </div> */}
                          <div className="particular-info">
                            <span className="title">Admission Eligibility</span>
                            <div className="info">
                              <span className="status">
                                {/* {item?.is_eligible} */}
                                {item?.is_eligible === 1
                                  ? "Yes"
                                  : item?.is_eligible === 0
                                  ? "No"
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Gender</span>
                            <div className="info">
                              <span className="status">{item?.gender}</span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Religion</span>
                            <div className="info">
                              <span className="status">{item?.religion}</span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Hostel Facility</span>
                            <div className="info">
                              <span className="status">
                                {/* {item?.hostel_check} */}
                                {item?.hostel_check === 1
                                  ? "Yes"
                                  : item?.hostel_check === 0
                                  ? "No"
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Hafiz-e-Quran</span>
                            <div className="info">
                              {/* <span className="status">{item?.is_hafiz}</span> */}
                              <span className="status">
                                {item?.is_hafiz === 1
                                  ? "Yes"
                                  : item?.is_hafiz === 0
                                  ? "No"
                                  : "N/A"}
                              </span>
                            </div>
                          </div>

                          {/* Action icons portion */}
                          {/* <div className="particular-info">
                            <span className="title">Action</span>
                            <div className="info">
                              <div className="table-action-icons">
                                <div className="action-icon">
                                  <TableBlackRightArrowSvg />
                                </div>
                                <div className="action-icon download">
                                  <TableDownloadPrimarySvg />
                                </div>
                                <div className="action-icon">
                                  <EditTableSvg />
                                </div>
                                <div className="action-icon">
                                  <CallTableSvg />
                                </div>
                                <div className="action-icon">
                                  <MessageTableSvg />
                                </div>
                                <div className="action-icon">
                                  <DeleteTableSvg />
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <Fragment>
            <DataNotFound show={!isLoading && !data?.length} />
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </div>
      </AdmissionApplicantsListingSection>
    </AdmissionApplicantsListingMain>
  );
};

export default AdmissionApplicantsListing;
