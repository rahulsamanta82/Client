import { FC, Fragment, useState, useEffect } from "react";
import {
  DarkEyeSvg,

  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  SurveyReportListingMain,
  SurveyReportListingSection,
  SurveyReportListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const SurveyReportListing: FC = () => {
  const navigate = useNavigate();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "ID",
    "Title",
    "Term",
    "Year",
    "Semester",
    "Created",
    "Expire",
    "Actions",
  ];

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: " All Survey Reports", path: siteRoutes.qecSurveyReportlist },
  ];

  const goToSurveyReport = () => {
    navigate(siteRoutes.createQecSurveyReport);
  };
  return (
    <SurveyReportListingMain>
      <SurveyReportListingTop>
        <div className="left">
          <span className="page-heading">All Survey Reports</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button" onClick={goToSurveyReport}>
            <button className="lg-rounded-btn">+ Generate report</button>
          </div>
        </div>
      </SurveyReportListingTop>

      <SurveyReportListingSection className="content-radius-shadow">
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
              <Fragment>
                <tr>
                  <td>
                    <div className="mw-100">1</div>
                  </td>
                  <td>
                    <div className="mw-100">Student Feedback Survey</div>
                  </td>
                  <td>
                    <div className="mw-100">Final</div>
                  </td>
                  <td>
                    <div className="mw-100">2024</div>
                  </td>
                  <td>
                    <div className="mw-100">SPRING</div>
                  </td>
                  <td>
                    <div className="mw-100">2024-08-12</div>
                  </td>
                  <td>
                    <div className="mw-100">2024-08-19</div>
                  </td>
                  <td>
                    <div className="mw-100">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <DarkEyeSvg/>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
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
      </SurveyReportListingSection>
    </SurveyReportListingMain>
  );
};

export default SurveyReportListing;
