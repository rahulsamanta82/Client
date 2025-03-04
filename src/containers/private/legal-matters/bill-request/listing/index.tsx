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
  BillRequestListingMain,
  BillRequestListingSection,
  BillRequestListingTop,
} from "./style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const BillRequestListing: FC = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Sr.", "Case No#", "Amount", "Status"];

  const navigate = useNavigate();
  const goToCreateBillRequest = () => {
    navigate(siteRoutes.createBillRequest);
  };

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Bill Requests",
      path: siteRoutes.billRequestList,
    },
  ];
  return (
    <BillRequestListingMain>
      <BillRequestListingTop>
        <div className="left">
          <span className="page-heading">Bill Requests </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateBillRequest}>
              + Add New
            </button>
          </div>
        </div>
      </BillRequestListingTop>

      <BillRequestListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Federal Law</div>
                  </td>
                  <td>National Assembly Pakistan</td>

                  <td>90,000</td>
                  <td>
                    <span className="status-tile green">Active</span>
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
      </BillRequestListingSection>
    </BillRequestListingMain>
  );
};

export default BillRequestListing;
