import { FC, Fragment, useState } from "react";
import {
  ClockSvg,
  DownArrowLightgrayMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  LogsListingMain,
  LogsListingSection,
  LogsListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const SystemLogs: FC = () => {
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
  const columns: string[] = ["Today"];

  const toggleRowExpand = (index: number) => {
    const dat = [...data];
    dat[index].isExpanded = !dat[index].isExpanded;
    setData([...dat]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const toggleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  return (
    <LogsListingMain>
      <LogsListingTop>
        <div className="left">
          <span className="page-heading">System Error Logs</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </LogsListingTop>

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
                <label>Key Word</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" />
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
      <LogsListingSection className="content-radius-shadow">
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
                        <div className="logs-data">
                          <div>
                            <span>
                              All Server log-2024-06-13{" "}
                              <span className="log-status-color">
                                * 100 500 All
                              </span>{" "}
                            </span>
                          </div>
                          <div>
                            <ClockSvg />
                            <span>4:33pm</span>
                          </div>
                        </div>
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
      </LogsListingSection>
    </LogsListingMain>
  );
};

export default SystemLogs;
