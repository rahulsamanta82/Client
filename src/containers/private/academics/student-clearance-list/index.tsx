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
  AcademicStudentClearanceListingMain,
  AcademicStudentClearanceListingSection,
  AcademicStudentClearanceListingTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";

const AcademicStudentClearanceListing: FC = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Sr #",
    "Registration No",
    "Student Name",
    "Father Name",
    "Status",
    "Action",
  ];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Student Listing", path: siteRoutes.studentClearenceListing },
  ];

  return (
    <AcademicStudentClearanceListingMain>
      <AcademicStudentClearanceListingTop>
        <div className="left">
          <span className="page-heading">Student Listing </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </AcademicStudentClearanceListingTop>

      <AcademicStudentClearanceListingSection className="content-radius-shadow">
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
                    <td>1</td>
                    <td>FA23425435345</td>
                    <td>Shayan Faisal</td>
                    <td>Faisal Maqbool</td>
                    <td>
                      <span className="status-tile red">pending</span>
                    </td>

                    <td>
                      <div className="table-action-icons">
                        <div className="action-button">
                          <button className="criteria-btn">Manage Fee</button>
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
          <Fragment>
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </div>
      </AcademicStudentClearanceListingSection>
    </AcademicStudentClearanceListingMain>
  );
};

export default AcademicStudentClearanceListing;
