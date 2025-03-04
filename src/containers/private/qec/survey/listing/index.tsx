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

const SurveyListing: FC = () => {
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
    "Serial No",
    "Session",
    "Department",
    "Course",
    "Course Code",
    "Credit Hours",
    "Teachers",
    "Participated",
    "Genrated Hours",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();
  const goToCreateSurvey = () => {
    navigate(siteRoutes.createSurvey);
  };

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Survey Listing", path: siteRoutes.surveyListing },
  ];
  return (
    <SurveyListingMain>
      <SurveyListingTop>
        <div className="left">
          <span className="page-heading">Survey Listing </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateSurvey}>
              + Generate Survey
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
                <label>Academic Sessions</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="">
                      <option value="">Fall 2022</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                  // onClick={handleResetFilters}
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
                    <div className="mw-150">1</div>
                  </td>
                  <td>
                    <div className="mw-100">Fall somethinfg</div>
                  </td>
                  <td>
                    <div className="mw-100">Department of Islamic</div>
                  </td>
                  <td>
                    <div className="mw-150">Dawah and Islamic Culture</div>
                  </td>
                  <td>
                    <div className="mw-150">ISL-234321</div>
                  </td>
                  <td>3</td>
                  <td>DR. Shayan Faisal</td>
                  <td>48</td>
                  <td>20-12-2022</td>
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

export default SurveyListing;
