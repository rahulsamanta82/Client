import { FC, Fragment, useState, useEffect } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  AcademicFeeTypeListingMain,
  AcademicFeeTypeListingSection,
  AcademicFeeTypeListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const AcademicFeeTypeListing: FC = () => {
  const [search, setSearch] = useState("");

  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Fee Type Title", "Action"];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Fee Types", path: siteRoutes.academicFeeTypeListing },
  ];
  const navigate = useNavigate();

  const goToCreateFeeType = () => {
    navigate(siteRoutes.createAcademicFeeType);
  };

  return (
    <AcademicFeeTypeListingMain>
      <AcademicFeeTypeListingTop>
        <div className="left">
          <span className="page-heading">Fee Types </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button">
            <button className="lg-rounded-btn" onClick={goToCreateFeeType}>
              + Add Fee Type
            </button>
          </div>
        </div>
      </AcademicFeeTypeListingTop>

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
                <label>Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Enter Name" />
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

      <AcademicFeeTypeListingSection className="content-radius-shadow">
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
              {[1, 1, 1].map((item: any, index: number) => (
                <Fragment key={index}>
                  <tr>
                    <td>Admission Fee</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>

                        <div className="action-icon">
                          <DeleteTableSvg />
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
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
      </AcademicFeeTypeListingSection>
    </AcademicFeeTypeListingMain>
  );
};

export default AcademicFeeTypeListing;
