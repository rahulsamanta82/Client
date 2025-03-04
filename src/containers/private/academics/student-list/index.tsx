import { FC, Fragment, useState, useEffect } from "react";
import {
  CallTableSvg,
  DownArrowLightgrayMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  AcademicDeafaulterStudentMain,
  AcademicDeafaulterStudentSection,
  AcademicDeafaulterStudentTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";

const AcademicDeafaulterStudent: FC = () => {
  const [search, setSearch] = useState("");
  const [studentData, setStudentData] = useState<any[]>([
    {
      cnic: "F21BARIN1E02051",
      name: "Farooq Ahmad",
      father_name: "BS Interior Design (A) ",
      father_cnic: "31203-3567057-2",
      app_no: "BSINTD-FALL 2023",
      fee_status: "50,000000",

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
    "Registration #",
    "Name",
    "Program",
    "CNIC",
    "Challan No.",
    "Amount",
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

    { title: "Student Listing", path: siteRoutes.academicDefaulterStudent },
  ];

  return (
    <AcademicDeafaulterStudentMain>
      <AcademicDeafaulterStudentTop>
        <div className="left">
          <span className="page-heading">Student Listing </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right"></div>
      </AcademicDeafaulterStudentTop>

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
                <label>Academic Session</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select Academic Session</option>
                    </select>
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

      <AcademicDeafaulterStudentSection className="content-radius-shadow">
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
                    <td>
                      <span className="status-tile red">DropOut</span>
                    </td>
                  </tr>
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
      </AcademicDeafaulterStudentSection>
    </AcademicDeafaulterStudentMain>
  );
};

export default AcademicDeafaulterStudent;
