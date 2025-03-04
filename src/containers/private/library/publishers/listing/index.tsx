import { FC, Fragment, useState, useEffect } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
    LibraryPublishersListingMain,
    LibraryPublishersListingSection,
    LibraryPublishersListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const LibraryPublishersListing: FC = () => {
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
    "Name",
    "Address",
    "City",
    "Country",
    "Phone Number",
    "Fax",
    "Email",
    "Website",
    "Action",
  ];

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Publishers ", path: siteRoutes.libraryPublisherlist },
  ];

  const goToCreatePublisher = () => {
    navigate(siteRoutes.createLibraryPublisher);
  };
  return (
    <LibraryPublishersListingMain>
      <LibraryPublishersListingTop>
        <div className="left">
          <span className="page-heading">Publishers</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div
            className="download-list-button"
            onClick={goToCreatePublisher}
          >
            <button className="lg-rounded-btn">+ Add Publisher</button>
          </div>
        </div>
      </LibraryPublishersListingTop>

      <LibraryPublishersListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Ap Publication</div>
                  </td>
                  <td>
                    <div className="mw-150">Kashif Publications</div>
                  </td>
                  <td>
                    <div className="mw-150">Lahore</div>
                  </td>
                  <td>
                    <div className="mw-150">Pakistan</div>
                  </td>
                  <td>
                    <div className="mw-150">0300670000</div>
                  </td>
                  <td>
                    <div className="mw-150">91-11-2685111</div>
                  </td>
                  <td>
                    <div className="mw-150">asif@gmail.com</div>
                  </td>
                  <td>
                    <div className="mw-150">www.abhinavexports.com</div>
                  </td>
                  <td>
                    <div className="mw-150">
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
      </LibraryPublishersListingSection>
    </LibraryPublishersListingMain>
  );
};

export default LibraryPublishersListing;
