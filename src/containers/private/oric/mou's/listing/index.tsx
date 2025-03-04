import { FC, Fragment, useState, useEffect } from "react";
import {
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  PrintGreenSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  MOUListingMain,
  MOUListingSection,
  MOUListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const OricMOUListing: FC = () => {
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
    "Party-I Focal Person",
    "Party-II",
    "Party-II Focal Person",
    "Community",
    "Nature",
    "Date Signed",
    "Duration",
    "Status",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();
  const goToCreateMoU = () => {
    navigate(siteRoutes.createOricMou);
  };

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "MOU's", path: siteRoutes.oricMouListing },
  ];
  return (
    <MOUListingMain>
      <MOUListingTop>
        <div className="left">
          <span className="page-heading">MOU's</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateMoU}>
              + Add MoU
            </button>
          </div>
        </div>
      </MOUListingTop>

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
                <label>Faculties</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="">
                      <option value="">Select Faculty</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="">
                      <option value="">Select Department</option>
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

      <MOUListingSection className="content-radius-shadow">
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
                    <div className="mw-100">M Imran Rasheed</div>
                  </td>
                  <td>
                    <div className="mw-100">Tourism Development Corporation of Pakistan</div>
                  </td>
                  <td>
                    <div className="mw-150">M Asim Raza (Manager Operations TDCP)</div>
                  </td>
                  <td>
                    <div className="mw-150">Industry (National)</div>
                  </td>
                  <td>
                    <div className="mw-150">Collaboration in organizing tourism events</div>
                  </td>
                  <td>
                    <div className="mw-100">Wed, 24-2-2024</div>
                  </td>
                  <td>
                    <div className="mw-100">5 Years</div>
                  </td>
                  <td>
                    <div className="status-tile green">Approved</div>
                  </td>
                  <td>
                    <div className="mw-150">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>
                        <div className="action-icon">
                          <PrintGreenSvg/>
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
      </MOUListingSection>
    </MOUListingMain>
  );
};

export default OricMOUListing;



