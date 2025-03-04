import { FC, Fragment, useState } from "react";
import {
  DeleteTableSvg,
  TableDownloadPrimarySvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  AdmissionStudentsListingMain,
  AdmissionStudentsListingSection,
  AdmissionStudentsListingTop,
  Filters,
  FilterSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface AdmissionStudentListingProps {}

const StudentClearence: FC<AdmissionStudentListingProps> = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const columns: string[] = [
    "Title",
    "Application#",
    "Challan#",
    "Due Date",
    "Amount",
    "Status",
    "Action",
  ];

  const breadcrumbLinks = [
    { title: "Student Clearance /", path: siteRoutes.CreateMajorCategories },
    { title: "Admission Clearance", path: siteRoutes.academicStudentClearence },
  ];

  const [isVisible, setIsVisible] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    setIsVisible(true); // Show the listing section
  };

  // Function to handle form reset
  const handleReset = () => {
    setIsVisible(false); // Hide the listing section
  };

  return (
    <AdmissionStudentsListingMain>
      <AdmissionStudentsListingTop>
        <div className="left">
          <span className="page-heading">Student Listing</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn">Download List</button>
          </div>
        </div>
      </AdmissionStudentsListingTop>

      <FilterSection className="content-radius-shadow">
        <Filters>
          <div className="filter-fields">
            <div className="input-field">
              <label>Registration Number</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    placeholder="Enter Registration Number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="submit-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" onClick={handleReset}>
                Reset
              </button>
              <button className="lg-rounded-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Filters>
      </FilterSection>

      {isVisible && (
        <Fragment>
          <AdmissionStudentsListingSection className="content-radius-shadow">
            <div className="stats-heading">Student Details</div>
            <div className="stats-table">
              <div className="left-table">
                <div className="table-container">
                  <table className="custom-table">
                    <tbody>
                      <tr>
                        <th>Student Name</th>
                        <td>Muhammad Shayan Faisal</td>
                      </tr>
                      <tr>
                        <th>Reg No</th>
                        <td>21143324453425432</td>
                      </tr>
                      <tr>
                        <th>CNIC</th>
                        <td>31303-4566324-9</td>
                      </tr>
                      <tr>
                        <th>Program</th>
                        <td>PhD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="center-table">
                <div className="table-container">
                  <table className="custom-table">
                    <tbody>
                      <tr>
                        <th>Campus</th>
                        <td>Bahawalpur</td>
                      </tr>
                      <tr>
                        <th>Department</th>
                        <td>Department of AI</td>
                      </tr>
                      <tr>
                        <th>LMS Status</th>
                        <td>
                          <span className="status-tile green">
                            Not Suspended
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Student Status</th>
                        <td>
                          <span className="status-tile red">In-Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="right-table">
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Session Title</th>
                        <th>Enrolled Courses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Fall 2020</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>Spring 2022</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>Spring 2023</td>
                        <td>4</td>
                      </tr>
                      <tr>
                        <td>Fall 2023</td>
                        <td>5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AdmissionStudentsListingSection>

          <AdmissionStudentsListingSection className="content-radius-shadow">
            <div className="stats-heading">Voucher Details</div>
            <div className="data-table">
              <table className="bottom-bordered-cells">
                <thead>
                  <tr>
                    {columns.map((column: string, index: number) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((item: any, index: number) => (
                    <Fragment key={index}>
                      <tr>
                        <td>Spring 2020 Semester Fee</td>
                        <td>12345789--09876</td>
                        <td>3456789009876</td>
                        <td>12-02-2122</td>
                        <td>22567</td>
                        <td>
                          <span className="status-tile red">Pending</span>
                        </td>
                        <td>
                          <div className="table-action-icons">
                            <div className="action-icon">
                              <TableDownloadPrimarySvg />
                            </div>
                            <div className="action-icon">
                              <DeleteTableSvg />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <Pagination
                onPageChange={(page: any) => console.log(page)}
                {...pagination}
              />
            </div>
          </AdmissionStudentsListingSection>
        </Fragment>
      )}
    </AdmissionStudentsListingMain>
  );
};

export default StudentClearence;
