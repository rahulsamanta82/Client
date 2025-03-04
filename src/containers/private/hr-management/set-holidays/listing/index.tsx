import { FC, Fragment, useState, useEffect } from "react";
import {
  AddTablSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  AdvisorsRatesListingMain,
  AdvisorsRatesListingSection,
  AdvisorsRatesListingTop,
} from "./style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const SetHolidaysListing: FC = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Title", "Date", "No of Days", "Action"];

  const navigate = useNavigate();
  const goToCreateAdvsorRates = () => {
    navigate(siteRoutes.createAdvisorRates);
  };

  const breadcrumbLinks = [
    { title: "HR Management  /", path: siteRoutes.hrManagementLeaveDashboard },
    { title: " Set Holidays", path: siteRoutes.setHolidaysListing },
  ];
  return (
    <AdvisorsRatesListingMain>
      <AdvisorsRatesListingTop>
        <div className="left">
          <span className="page-heading">Holidays </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateAdvsorRates}>
              + Add Holiday
            </button>
          </div>
        </div>
      </AdvisorsRatesListingTop>

      <AdvisorsRatesListingSection className="content-radius-shadow">
        <div className="table-top">
          <div className="table-heading">Holidays List</div>
          <div className="year-select">
            <select name="" id="">
              <option value="2024">Year 2024</option>
            </select>
          </div>
        </div>
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
                    <div className="mw-150">Eid Holiday's </div>
                  </td>
                  <td>
                    <div className="mw-100">Jun 17 to Jun 19, 2024</div>
                  </td>
                  <td>
                    <div className="mw-100">3</div>
                  </td>
                  <td>
                    <div className="table-action-icons">
                      <div className="action-icons">
                        <EditTableSvg />
                      </div>
                      <div className="action-icons">
                        <DeleteTableSvg />
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
      </AdvisorsRatesListingSection>
    </AdvisorsRatesListingMain>
  );
};

export default SetHolidaysListing;
