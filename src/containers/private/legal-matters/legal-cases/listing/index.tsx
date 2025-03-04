import { FC, Fragment, useState, useEffect } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
  PdfSvg,
  SearchFieldSvg,
  TableBlackRightArrowSvg,
  TableDownloadPrimarySvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  LegalCasesListingMain,
  LegalCasesListingSection,
  LegalCasesListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

interface AdmissionStudentListingProps {}

const LegalCasesListing: FC<AdmissionStudentListingProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Sr.",
    "Institution Date",
    "Case No",
    "Title",
    "Nature",
    "Matter",
    "Court",
    "Deffendant",
    "Plaintiff/Petitioner",
    "Current Legal Advisor",
    "Current Status",
    "Decision",
    "Decision Date",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Cases ",
      path: siteRoutes.legalCasesList,
    },
  ];
  const navigate = useNavigate();
  const goToCreateLegalCases = () => {
    navigate(siteRoutes.createLegalCases);
  };
  return (
    <LegalCasesListingMain>
      <LegalCasesListingTop>
        <div className="left">
          <span className="page-heading">Legal Cases</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateLegalCases}>
              + Add New
            </button>
          </div>
        </div>
      </LegalCasesListingTop>

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
                <label>Court</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="campus">
                      <option value="">Select Court</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Department</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Active</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Legal Advisor</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="academic_session">
                      <option value="">Select Legal Advisor</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Matter Category</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="category">
                      <option value="">Select Category</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Year</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="program">
                      <option value="">Select Year</option>
                    </select>
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

      <LegalCasesListingSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" value={search} />
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
                  <td>1</td>
                  <td>2024-07-12</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>Lorem ipsum dolor sit amet consecte</td>
                  <td>ordinary</td>
                  <td>1</td>
                  <td>2024-07-12</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>Lorem ipsum dolor sit amet consecte</td>
                  <td>ordinary</td>
                  <td>Lorem elit.</td>
                  <td>Lorem</td>
                  <td>ordinary</td>
                  <td>
                    <div className="table-action-icons">
                      <div className="action-button">
                        <button className="special-btn">TimeLine</button>
                      </div>
                      <div className="action-button">
                        <button className="seats-btn">Document</button>
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
      </LegalCasesListingSection>
    </LegalCasesListingMain>
  );
};

export default LegalCasesListing;
