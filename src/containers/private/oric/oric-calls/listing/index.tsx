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
  ConferenceListingMain,
  ConferenceListingSection,
  ConferenceListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const OricCallsListing: FC = () => {
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
    "Sr No.",
    "Title",
    "Category",
    "Closing Date",
    "View Call",
    "Weblink",
    "Status",
    "Action",
  ];

  const navigate = useNavigate();
  const goToCreatecalls = () => {
    navigate(siteRoutes.createOricCalls);
  };
  const goToCallsCategory = () => {
    navigate(siteRoutes.oricCallCategoriesListing);
  };

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Calls", path: siteRoutes.oricCallListing },
  ];
  return (
    <ConferenceListingMain>
      <ConferenceListingTop>
        <div className="left">
          <span className="page-heading">Calls</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreatecalls}>
              + Add Calls
            </button>
          </div>
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCallsCategory}>
              + Call Categories
            </button>
          </div>
        </div>
      </ConferenceListingTop>
      <ConferenceListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Pakistan-Kazakhstan Joint integovermmental Comission</div>
                  </td>
                  <td>
                    <div className="mw-150">Pakistan-Kazakhstan JIC</div>
                  </td>
                  <td>
                    <div className="mw-150">Fri, 31-05-2024</div>
                  </td>
                
                  <td>
                    <div className="mw-100"><DarkEyeSvg/></div>
                  </td>
                  <td>
                    <div className="mw-100">-</div>
                  </td>
                  <td>
                    <div className="mw-100 status-tile green">Email Sent</div>
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
      </ConferenceListingSection>
    </ConferenceListingMain>
  );
};

export default OricCallsListing;



