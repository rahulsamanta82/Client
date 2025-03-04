import { FC, Fragment, useState } from "react";
import {
  DownArrowLightgrayMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  UserAuditListingMain,
  UserAuditListingSection,
  UserAuditListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const UserAuditListing: FC = () => {
  const [data, setData] = useState<any[]>([
    { isExpanded: false },
    { isExpanded: false },
    { isExpanded: false },
    { isExpanded: false },
  ]);
  const { hasAccess } = useStore();
  const [search, setSearch] = useState("");
  const {
    isComponentVisible: showDropdownMenu,
    setIsComponentVisible: setShowDropdownMenu,
    ref: dropdownMenuRef,
  } = useComponentVisible(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Date Time",
    "User",
    "Section",
    "Action",
    "IP",
    "URL",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  return (
    <UserAuditListingMain>
      <UserAuditListingTop>
        <div className="left">
          <span className="page-heading">User Audit</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </UserAuditListingTop>

      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={openFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {openFilterDropdown && (
          <Filters>
            <div className="common-fields">
              <div className="input-field">
                <label>From Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>To Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Key Word</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="common-fields">
              <div className="input-field">
                <label>Module</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Section</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Action</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Action</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="common-fields">
              <div className="input-field">
                <label> IP</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="radio-field">
                <label htmlFor="no">Unique Users</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="yes" />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="no" />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
              </div>
              <div className="radio-field">
                <label htmlFor="no">Unique IP</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="yes" />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="no" />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray">Reset</button>
                <button className="lg-rounded-btn">Apply Filters</button>
              </div>
            </div>
          </Filters>
        )}
      </FilterSection>
      <UserAuditListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadStudentRegPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadStudentRegExcel) && (
              <div className="export-btn">
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            )}
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
              // onKeyUp={handleSearch}
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
              {data.map((item: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${item.isExpanded && "opened"}`}>
                      <td>
                        <div className="mw-150">2024-06-12 12:00 AM</div>
                      </td>
                      <td>
                        <div className="mw-100">Jessica Baker</div>
                      </td>
                      <td>
                        <div className="mw-150">services</div>
                      </td>
                      <td>
                        <div className="mw-150">download_challan</div>
                      </td>
                      <td>
                        <div className="mw-150">72.255.3.151</div>
                      </td>
                      <td>
                        <div>/services/download_challan/2406269037</div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
        </Fragment>
      </UserAuditListingSection>
    </UserAuditListingMain>
  );
};

export default UserAuditListing;
