import { FC, Fragment, useState } from "react";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  EmployeesAttendanceListingMain,
  EmployeesAttendanceListingSection,
  EmployeesAttendanceListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS if needed
// import { addDays } from "date-fns"; // Import addDays utility

const EmployeesAttendanceListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Date",
    "Name",
    "Designation",
    "CHECKIN",
    "CHECKOUT",
    "In Time",
    "Over Time",
    "Action",
  ];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    { title: "Attendance", path: siteRoutes.myAttendanceList },
  ];
  const navigate = useNavigate();

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const goToLeaveRequstion = () => {
    navigate(siteRoutes.createLeaveRequestion);
  };

  //   const [startDate, setStartDate] = useState<Date | null>(new Date());
  //   const [endDate, setEndDate] = useState<Date | null>(null);

  //   // Update the `onChange` function to handle Date type and null
  //   const onChange = (dates: [Date | null, Date | null]) => {
  //     const [start, end] = dates;
  //     setStartDate(start);
  //     setEndDate(end);
  //   };
  return (
    <>
      <EmployeesAttendanceListingMain>
        <EmployeesAttendanceListingTop>
          <div className="left">
            <span className="page-heading">Attendance</span>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
        </EmployeesAttendanceListingTop>
        <FilterSection className="content-radius-shadow">
          <div className="employe-info-main">
            <div className="employe-info">
              <div className="employe-heading">Employe Name:</div>
              <div className="employe-name">Shayan Faisal</div>
            </div>
            <div className="employe-info">
              <div className="employe-heading">Designation:</div>
              <div className="employe-name">Web Developer</div>
            </div>
          </div>
        </FilterSection>

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
                  <label>From date</label>
                  <div className="field-wrap">
                    <div className="field">
                      <input type="date" />
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <label>To date</label>
                  <div className="field-wrap">
                    <div className="field">
                      <input type="date" />
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

        <EmployeesAttendanceListingSection className="content-radius-shadow">
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
                {[1, 1, 1].map((item: any, index: number) => (
                  <Fragment key={index}>
                    <tr>
                      <td>20-12-2024</td>

                      <td>
                        <div className="mw-100">Mr. Nazir Ahmed</div>
                      </td>
                      <td>Junior Program</td>
                      <td>10:12</td>
                      <td>19:12</td>
                      <td>10:00</td>
                      <td>00:30</td>
                      <td>
                        <div className="table-action-buttons">
                          <div
                            className="table-action-button"
                            onClick={goToLeaveRequstion}
                          >
                            <button>Apply Leave</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <Fragment>
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </EmployeesAttendanceListingSection>
      </EmployeesAttendanceListingMain>

      {/* <DatePicker
        selected={startDate || undefined} // Convert null to undefined
        onChange={onChange}
        startDate={startDate || undefined} // Convert null to undefined
        endDate={endDate || undefined} // Convert null to undefined
        selectsRange
        excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
        inline
      /> */}
    </>
  );
};

export default EmployeesAttendanceListing;
