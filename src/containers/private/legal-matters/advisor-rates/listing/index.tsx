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

const AdvisorsRatesListing: FC = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Title",
    "Rate",
    "Year",
    "Description",
    "Category",
    "Is Avtive",
  ];

  const navigate = useNavigate();
  const goToCreateAdvsorRates = () => {
    navigate(siteRoutes.createAdvisorRates);
  };

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Advisors Rates", path: siteRoutes.advisorRatesListing },
  ];
  return (
    <AdvisorsRatesListingMain>
      <AdvisorsRatesListingTop>
        <div className="left">
          <span className="page-heading">Advisors Rates </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateAdvsorRates}>
              + Add New
            </button>
          </div>
        </div>
      </AdvisorsRatesListingTop>

      <AdvisorsRatesListingSection className="content-radius-shadow">
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
                  {/* <td>
                    <div className="mw-150">1</div>
                  </td>
                  <td>
                    <div className="mw-100">federal law</div>
                  </td>
                  <td>
                    <div className="mw-100">Department of Islamic</div>
                  </td>
                  <td>
                    <div className="mw-150">None</div>
                  </td>
                  <td>
                    <div className="mw-150"></div>
                  </td>
                  <td>
                    <span className="status-tile green">Active</span>
                  </td> */}
                  <td>No data Available</td>
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

export default AdvisorsRatesListing;
