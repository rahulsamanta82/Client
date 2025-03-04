import { FC, Fragment, useState, useEffect } from "react";
import {
  DarkEyeSvg,
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  ReportCategoriesListingMain,
  ReportCategoriesListingSection,
  ReportCategoriesListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const ManageReportListing: FC = () => {
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
    "Title",
    "Category",
    "View File",
    "Order By",
    "Is Active",
    "Actions",
  ];

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Manage Reports ", path: siteRoutes.qecReportManagelist },
  ];

  const goToCreateManageReport = () => {
    navigate(siteRoutes.createQecReportManage);
  };
  return (
    <ReportCategoriesListingMain>
      <ReportCategoriesListingTop>
        <div className="left">
          <span className="page-heading">Manage Reports</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button" onClick={goToCreateManageReport}>
            <button className="lg-rounded-btn">+ Add Report</button>
          </div>
        </div>
      </ReportCategoriesListingTop>

      <ReportCategoriesListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Accreditation Status</div>
                  </td>
                  <td>
                    <div className="mw-100">Accreditation</div>
                  </td>
                  <td>
                    <div
                      className="mw-100"
                    >
                      <button className="view-file-btn"><DarkEyeSvg/></button>
                    </div>
                  </td>
                  <td>
                    <div className="mw-150">1</div>
                  </td>
                  <td>
                    <div className="mw-150">Yes</div>
                  </td>
                  <td>
                    <div className="mw-100">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
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
      </ReportCategoriesListingSection>
    </ReportCategoriesListingMain>
  );
};

export default ManageReportListing;
