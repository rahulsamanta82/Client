import { FC, Fragment, useState, useEffect } from "react";
import {
  DeleteTableSvg,
  ExcelSvg,
  PdfSvg,
  PlusPrimarySvg,
  SearchFieldSvg,
  StatsSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  KeyPerformanceListingMain,
  KeyPerformanceListingSection,
  KeyPerformanceListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const KeyPerformanceListing: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const [search, setSearch] = useState("");

  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Serial No.",
    "Year",
    "Score Assigned",
    "Score Obtained",
    "Action"
  ];

  const navigate = useNavigate();
  const goToAddPerformance = () => {
    navigate(siteRoutes.createKeyPerformanceIndicatorYear);
  };

  const goToKPIScore = () => {
    navigate(siteRoutes.oricKPIScore);
  };

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Key Performance Indicator Year", path: siteRoutes.keyPerformanceIndicatorYearListing },
  ];
  return (
    <KeyPerformanceListingMain>
      <KeyPerformanceListingTop>
        <div className="left">
          <span className="page-heading">Key Performance Indicator Year</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button
              className="lg-rounded-btn"
              onClick={goToAddPerformance}
            >
              + Add Year
            </button>
          </div>
        </div>
      </KeyPerformanceListingTop>
      <KeyPerformanceListingSection className="content-radius-shadow">
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
                    <div className="mw-150">1</div>
                  </td>
                  <td>
                    <div className="mw-150">2022</div>
                  </td>
                  <td>
                    <div className="mw-150">100</div>
                  </td>
                  <td>
                    <div className="mw-150">46</div>
                  </td>

                  <td>
                    <div className="mw-100">
                      <div className="table-action-icons">
                      <div className="action-icon">
                          <PlusPrimarySvg />
                        </div>
                        <div className="action-icon" onClick={goToKPIScore}>
                          <StatsSvg />
                        </div>
                        <div className="action-icon">
                          <DeleteTableSvg />
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
      </KeyPerformanceListingSection>
    </KeyPerformanceListingMain>
  );
};

export default KeyPerformanceListing;
