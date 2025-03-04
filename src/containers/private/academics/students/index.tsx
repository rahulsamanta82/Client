import { FC, Fragment, useState, useEffect } from "react";
import {
  DownArrowLightgrayMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  AcademicStudentListingMain,
  AcademicStudentListingSection,
  AcademicStudentListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";

const AcademicStudent: FC = () => {
  const [search, setSearch] = useState("");
  const [studentData, setStudentData] = useState<any[]>([
    {
      cnic: "F21BARIN1E02051",
      name: "Farooq Ahmad",
      father_name: "BS Interior Design (A) ",
      father_cnic: "31203-3567057-2",
      app_no: "BSINTD-FALL 2023",
      fee_status: "Transferred to another Program",

      domicile: "New York",
      campus_title: "Main Campus",
      session_year: "2024",

      isExpanded: false,
    },
  ]);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "",
    "Registration #",
    "Student Name",
    "Program",
    "CNIC",
    "Plan Of Study",
    "Student Status",
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

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Students", path: siteRoutes.academicStudent },
  ];

  return (
    <AcademicStudentListingMain>
      <AcademicStudentListingTop>
        <div className="left">
          <span className="page-heading">Students </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn">Download List</button>
          </div>
        </div>
      </AcademicStudentListingTop>

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
                <label>Student Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Enter Student Name" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Father Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Enter Father Name " />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Roll Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Enter Roll Number" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" placeholder="31303-********-*" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Student Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="category">
                      <option value="">Select Student Status</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Gender</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="program">
                      <option value="">Select Gender</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Religion</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="fee_status">
                      <option value="-1">Select Religion</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>Select campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select id="admission_status" name="admission_status">
                      <option value="-1">Select campus</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Faculty</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="is_eligible" id="is_eligible">
                      <option value="-1">Select Faculty</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="is_eligible" id="is_eligible">
                      <option value="-1">Select Department</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Program Level</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="is_eligible" id="is_eligible">
                      <option value="-1">Select Program Level</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Program </label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="domicile">
                      <option value="">Select Program </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Domicile</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="city_id">
                      <option value="">Select Domicile</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select City</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="gender">
                      <option value="">Select City</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Document Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="quota">
                      <option value="">Select Document Status</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Registration Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter Registration Number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray">Reset</button>
                <button className="lg-rounded-btn">Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <AcademicStudentListingSection className="content-radius-shadow">
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
                    <td>{item?.fee_status}</td>
                  </tr>

                  {item.isExpanded && (
                    <tr>
                      <td></td>
                      <td colSpan={5}>
                        <div className="expanded-content">
                          {/* Expanded Row Details */}

                          <div className="particular-info">
                            <span className="title">Father Name</span>
                            <div className="info">
                              <span className="status">M.Iqbal</span>
                            </div>
                          </div>

                          <div className="particular-info">
                            <span className="title"> Campus</span>
                            <div className="info">
                              <span className="status">Main</span>
                            </div>
                          </div>
                          <div className="particular-info">
                            <span className="title">Gender</span>
                            <div className="info">
                              <span className="status">Male</span>
                            </div>
                          </div>

                          <div className="particular-info">
                            <span className="title">Action</span>
                            <div className="info">
                              <div className="table-action-icons">
                                <div className="action-button">
                                  <button className="criteria-btn">
                                    View Transcript
                                  </button>
                                </div>

                                <div className="action-button">
                                  <button>Enrollments</button>
                                </div>

                                <div className="action-button">
                                  <button>Vouchers</button>
                                </div>

                                <Fragment>
                                  <div className="action-button">
                                    <button className="criteria-btn">
                                      Stident Status
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="seats-btn">
                                      Migrated Student Courses
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="special-btn">
                                      Fulfillment Report
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="entry-test-btn">
                                      Add Retention
                                    </button>
                                  </div>
                                </Fragment>
                              </div>
                            </div>
                          </div>
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
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </div>
      </AcademicStudentListingSection>
    </AcademicStudentListingMain>
  );
};

export default AcademicStudent;
