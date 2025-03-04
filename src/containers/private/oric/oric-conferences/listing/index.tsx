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
  ConferenceListingMain,
  ConferenceListingSection,
  ConferenceListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const OricConferenceListing: FC = () => {
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
    "Event Title",
    "Event Type",
    "Focal Person",
    "Speaker/Resource Person",
    "Event Level",
    "Funding Agency",
    "Requested Amount",
    "Approved Amount",
    "Date Of Event",
    "Status",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();
  const goToCreateConference = () => {
    navigate(siteRoutes.createOricConference);
  };

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Conferences", path: siteRoutes.oricConferenceListing },
  ];
  return (
    <ConferenceListingMain>
      <ConferenceListingTop>
        <div className="left">
          <span className="page-heading">Conferences</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateConference}>
              + Add New Conferences
            </button>
          </div>
        </div>
      </ConferenceListingTop>

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
                      <option value="">All Faculties</option>
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
                    <div className="mw-150">Certification in Hand writing Analysis</div>
                  </td>
                  <td>
                    <div className="mw-150">Workshop</div>
                  </td>
                  <td>
                    <div className="mw-150">Saleem</div>
                  </td>
                  <td>
                    <div className="mw-150">Dr.Rqfiq Dar Associate Professor Lahore School of Professional</div>
                  </td>
                  <td>
                    <div className="mw-150">National</div>
                  </td>
                  <td>
                    <div className="mw-150">no funding</div>
                  </td>
                  <td>
                    <div className="mw-150">0</div>
                  </td>
                  <td>
                    <div className="mw-150">0</div>
                  </td>
                  <td>
                    <div className="mw-150">Fri, 11-03-2022</div>
                  </td>
                  <td>
                    <div className=" status-tile green">Approved</div>
                  </td>
                  <td>
                    <div className="mw-100">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>

                        <div className="action-icon">
                          <PrintGreenSvg />
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

export default OricConferenceListing;



