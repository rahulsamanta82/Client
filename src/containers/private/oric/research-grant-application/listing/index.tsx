import { FC, Fragment, useState, useEffect } from "react";
import {
    DarkEyeSvg,
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
  ResearchListingMain,
  ResearchListingSection,
  ResearchListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const ResearchApplicationListing: FC = () => {
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
    "Employee Name",
    "CNIC",
    "Email",
    "Phone",
    "Faculty",
    "Department",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();


  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Reasearch Grant Applications", path: siteRoutes.oricResearchGrantApplicationslisting },
  ];
  return (
    <ResearchListingMain>
      <ResearchListingTop>
        <div className="left">
          <span className="page-heading">Reasearch Grant Applications</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </ResearchListingTop>

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
                <label>From Year</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="">
                      <option value="">Select Year</option>
                    </select>
                  </div>
                </div>
              </div>
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

      <ResearchListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Naveed Akhtar</div>
                  </td>
                  <td>
                    <div className="mw-150">31202-0288460-5</div>
                  </td>
                  <td>
                    <div className="mw-150">nakhtar@hotmail.com
                    </div>
                  </td>
                  <td>
                    <div className="mw-150">03216841111</div>
                  </td>
                  <td>
                    <div className="mw-150">Faculty of Pharmacy</div>
                  </td>
                  <td>
                    <div className="mw-150">Department of Pharmaceultics</div>
                  </td>
                  <td>
                    <div className="mw-150">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <DarkEyeSvg/>
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
      </ResearchListingSection>
    </ResearchListingMain>
  );
};

export default ResearchApplicationListing;



