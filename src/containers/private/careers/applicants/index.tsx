import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  TableGreenEyeSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  ApplicantListingMain,
  ApplicantListingSection,
  ApplicantListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";
import { JobBatchDTO } from "utils/helpers/models/careers/job-batch.dto";
import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useCareers from "../useHooks";
import useOrganization from "containers/private/organization/useHooks";
import useFinance from "containers/private/finance/useHooks";
import { religions } from "utils/constants/array";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const CareerApplicantListing: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const { hasAccess } = useStore();
  const [designations, setDesignations] = useState<JobDesignationDTO[]>([]);
  const [jobBatches, setJobBatches] = useState<JobBatchDTO[]>([]);
  const [orgStructures, setOrgStructures] = useState<any[]>([]);
  const [challanStatuses, setChallanStatuses] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({
    designation: "",
    department: "",
    challan_status: "",
    batch: "2",
    campus: "",
    job_status_id: "1",
    disable: "",
    religion: "Islam",
    cnic: ""
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const navigate = useNavigate();
  const columns: string[] = [
    "",
    "CNIC",
    "App #",
    "Batch #",
    "Name",
    "Gender",
    "IUB Employee",
    "Date applied",
    "DOB",
  ];

  const { handleSearchChange, handleTableSearch } = useUtils();
  const { getCareerApplications, getJobDesignations, getJobBatches } = useCareers();
  const { getOrgStructures } = useOrganization();
  const { getChallanStatuses } = useFinance();


  useEffect(() => {
    getAllCareerApplications(pagination.page, search);
    getJobDesignations(setDesignations);
    getJobBatches(setJobBatches);
    getOrgStructures(setOrgStructures);
    getChallanStatuses(setChallanStatuses);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      // deleteCareerApplication(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllCareerApplications(page + 1, search);
  };
  const getAllCareerApplications = (page: number, search: string, filters: any = {}) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      ...filters
    };
    getCareerApplications(setData, queryParams, setPagination);
  };

  const toggleRowExpand = (index: number) => {
    data[index].isExpanded = !data[index].isExpanded;
    setData([...data]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const handleFilterChange = (event: any) => {
    const { value, name } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  const onSubmitFilters = () => {
    getAllCareerApplications(1, search, filters);
  }

  const onClearFilters = () => {
    for (let key in filters) {
      filters[key] = '';
    }
    setFilters({ ...filters });
    getAllCareerApplications(1, search, filters);
  }

  return (
    <ApplicantListingMain>
      <ApplicantListingTop>
        <div className="left">
          <span className="page-heading">Applicants</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn"></div>
        </div>
      </ApplicantListingTop>

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
                <label>Designation</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.designation} onChange={handleFilterChange} name="designation">
                      <option value="">Select Designation</option>
                      {designations.map((designation, index) => {
                        return <option value={designation.id} key={index}>{designation.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label> Select Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.department} onChange={handleFilterChange} name="department">
                      <option value="">Department</option>
                      {orgStructures.map((structure: any, index: number) => {
                        return <option value={structure.id} key={index}>{structure.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Challan Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.challan_status} onChange={handleFilterChange} name="challan_status">
                      <option value="">Select one</option>
                      {challanStatuses.map((status, index) => {
                        return <option value={status.id} key={index}>{status.challan_no}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label> Select Batch</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.batch} onChange={handleFilterChange} name="batch">
                      <option value="">Select Batch</option>
                      {jobBatches.map((batch, index) => {
                        return <option value={batch.id} key={index}>{batch.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label> Select Campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.campus} onChange={handleFilterChange} name="campus">
                      <option value="">Campus</option>
                      {orgStructures.map((structure, index) => {
                        return <option value={structure.id} key={index}>{structure.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label> Select Job Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label> Disable</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.disable} onChange={handleFilterChange} name="disable">
                      <option value="">Select one</option>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Religion</label>
                <div className="field-wrap">
                  <div className="field">
                    <select value={filters.religion} onChange={handleFilterChange} name="religion">
                      <option value="">Select one</option>
                      {religions.map((religion, index) => {
                        return <option value={religion.title} key={index}>{religion.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" value={filters.cnic} onChange={handleFilterChange} name="cnic" />
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
      <ApplicantListingSection className="content-radius-shadow">
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
              onChange={(e) =>
                handleSearchChange(e, setSearch, getAllCareerApplications)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllCareerApplications)}
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
              {data.map((applicant: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${applicant.isExpanded && "opened"}`}>
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{applicant.isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>
                        {applicant?.user?.cnic}
                      </td>
                      <td>
                        <div className="mw-150">1234</div>
                      </td>
                      <td>
                        <div className="mw-100">21-25</div>
                      </td>
                      <td>
                        <div className="mw-150">{applicant?.user?.name}</div>
                      </td>
                      <td>Male</td>
                      <td>
                        <div className="mw-100">Yes</div>
                      </td>
                      <td>
                        <div className="mw-150">{applicant?.date_applied}</div>
                      </td>
                      <td>{applicant?.user?.users_meta![0]?.date_of_birth}</td>
                    </tr>

                    {applicant.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={7}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Job Position</span>
                              <span className="info">--</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Father Name:</span>
                              <span className="info">--</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Mobile:</span>
                              <div className="info">
                                <span className="status">--</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Email:</span>
                              <div className="info">
                                <span className="status">--</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Domicile:</span>
                              <div className="info">
                                <span className="status">--</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  <div className="action-icon">
                                    <TableGreenEyeSvg />
                                  </div>
                                  <div className="action-icon">
                                    <EditTableSvg />
                                  </div>

                                  <div className="action-icon" onClick={() => handleDelete(applicant.id)}>
                                    <DeleteTableSvg />
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
      </ApplicantListingSection>
    </ApplicantListingMain>
  );
};

export default CareerApplicantListing;
