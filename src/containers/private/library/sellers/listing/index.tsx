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
  LibrarySellerListingMain,
  LibrarySellerListingSection,
  LibrarySellerListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const LibrarySellerListing: FC = () => {
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
    "Seller Title",
    "Seller Name",
    "Address",
    "City",
    "Country",
    "Phone Number",
    "Fax",
    "Email",
    "Website",
    "NTN",
    "Action",
  ];

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Sellers ", path: siteRoutes.librarySellerlist },
  ];

  const goToCreateSellers = () => {
    navigate(siteRoutes.createLibrarySeller);
  };
  return (
    <LibrarySellerListingMain>
      <LibrarySellerListingTop>
        <div className="left">
          <span className="page-heading">Sellers</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div
            className="download-list-button"
            onClick={goToCreateSellers}
          >
            <button className="lg-rounded-btn">+ Add Seller</button>
          </div>
        </div>
      </LibrarySellerListingTop>

      <LibrarySellerListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Donation Mr. Irfan Saleem</div>
                  </td>
                  <td>
                    <div className="mw-150">Dr. Shahzad Qaiser</div>
                  </td>
                  <td>
                    <div className="mw-150">Gulshan Iqbal ryk</div>
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
                    <div className="mw-150">-</div>
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
      </LibrarySellerListingSection>
    </LibrarySellerListingMain>
  );
};

export default LibrarySellerListing;
