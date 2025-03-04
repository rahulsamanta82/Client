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
  FrameworkListingMain,
  FrameworkListingSection,
  FrameworkListingTop,
} from "./style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const FrameworkListing: FC = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Title",
    "Type",
    "Organization Name",
    "Superior Law",
    "Date",
    "Validity from",
    "Validity  to",
    "Attachment",
    "Action",
  ];

  const navigate = useNavigate();
  const goToCreateFramwork = () => {
    navigate(siteRoutes.createLegalFramework);
  };

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Legal Framework Documents", path: siteRoutes.legalFrameworkList },
  ];
  return (
    <FrameworkListingMain>
      <FrameworkListingTop>
        <div className="left">
          <span className="page-heading">Legal Framework Documents </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateFramwork}>
              + Add New
            </button>
          </div>
        </div>
      </FrameworkListingTop>

      <FrameworkListingSection className="content-radius-shadow">
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
                    <div className="mw-100">federal law</div>
                  </td>
                  <td>
                    <div className="mw-100">Department of Islamic</div>
                  </td>
                  <td>
                    <div className="mw-150">None</div>
                  </td>
                  <td>
                    <div className="mw-150">23-12-2023</div>
                  </td>
                  <td>12-12-1212</td>
                  <td>12-12-2029</td>
                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon">
                        <DownloadTableSvg />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon">
                        <EditTableSvg />
                      </div>

                      <div className="action-icon">
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
      </FrameworkListingSection>
    </FrameworkListingMain>
  );
};

export default FrameworkListing;
