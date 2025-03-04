import { FC, Fragment, useState, useEffect } from "react";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  SurveyListingMain,
  SurveyListingSection,
  SurveyListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const LibraryBooksListing: FC = () => {
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
    "Title",
    "Author",
    "Publisher",
    "Language",
    "Year of Publication",
    "Edition",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();
  const goToCreateBooks = () => {
    navigate(siteRoutes.createLibraryBooks);
  };

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Books", path: siteRoutes.libraryBookslist },
  ];
  return (
    <SurveyListingMain>
      <SurveyListingTop>
        <div className="left">
          <span className="page-heading">Books</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateBooks}>
              + Add Books
            </button>
          </div>
        </div>
      </SurveyListingTop>

      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={openFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {openFilterDropdown && (
          <Filters>
            <div className="filter-fields">
              <div className="input-field">
                <label>Select Publisher</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="">
                      <option value="">Select One</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Language</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="">
                      <option value="">Select One</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                >
                  Reset
                </button>
                <button className="lg-rounded-btn">Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>

      <SurveyListingSection className="content-radius-shadow">
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
                    <div className="mw-150">-</div>
                  </td>
                  <td>
                    <div className="mw-100">-</div>
                  </td>
                  <td>
                    <div className="mw-100">Wiley-Blackwell</div>
                  </td>
                  <td>
                    <div className="mw-150">English</div>
                  </td>
                  <td>
                    <div className="mw-150">2016</div>
                  </td>
                  <td>
                    <div className="mw-150">7th</div>
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
      </SurveyListingSection>
    </SurveyListingMain>
  );
};

export default LibraryBooksListing;



