import { FC, Fragment, useState } from "react";
import {
  FinanceSessionStudentsListingSection,
  FinanceSessionStudentsListingTop,
  FinanceSessionStudentsListingMain,
  FilterSection,
  FilterHeader,
  Filters,
} from "./style";
import {
  BlackTableViewSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  ExcelSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import VoucherDetails from "./components/voucher-details";

interface FinanceSessionStudentsListingProps {}

const FinanceSessionStudentsListing: FC<
  FinanceSessionStudentsListingProps
> = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "Finance Academic Session /",
      path: siteRoutes.financeAcademicSessionListing,
    },
    {
      title: "Finance Session Students",
      path: siteRoutes.financeSessionStudentsListing,
    },
  ];

  const navigate = useNavigate();

  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  const columns: string[] = [
    "Reg Number",
    "Name",
    "CNIC",
    "Program",
    "Status",
    "Amount",
    "Admission Quota",
    "Fee Plan",
    "Fee Quota",
    "App No",
    "Action",
  ];

  const [data, setData] = useState<any[]>([]);

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const goToSectionCourses = () => {
    navigate(siteRoutes.sectionCoursesListing);
  };
  const [openVoucherDetails, setOpenVoucherDetails] = useState<boolean>(false);
  const goToVoucherDetails = () => {
    setOpenVoucherDetails(true);
  };

  return (
    <FinanceSessionStudentsListingMain>
      <FinanceSessionStudentsListingTop>
        <div className="left">
          <span className="page-heading">Consolidated Results</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </FinanceSessionStudentsListingTop>

      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={showFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {showFilterDropdown && (
          <Filters>
            <div className="filter-fields">
              <div className="input-field">
                <label htmlFor="">Select campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All campus</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Select Program Level</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Program Level</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Select Program</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Program</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Select Fee Plan</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Fee Plan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Registration Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Enter Registration Number</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">32102-*******-1</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Quotas</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All</option>
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
      <FinanceSessionStudentsListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
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
            <input type="search" placeholder="Search" />
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
              {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr>
                      <td>
                        <div className="mw-150">FACE2343D335DFSFSD3</div>
                      </td>
                      <td>Muhammad Farhan</td>
                      <td>
                        <div className="mw-150">31303-1234567-7</div>
                      </td>
                      <td>
                        <div className="mw-150">BS Accounting & Finance</div>
                      </td>
                      <td>
                        <div className="status">
                          <span className="status-tile green">Paid</span>
                        </div>
                      </td>
                      <td>31303</td>
                      <td></td>
                      <td>35345DKLSJSDLKFJKL435JWKLFELKJ35J345KLJDSJ35RSKSJ</td>
                      <td>None</td>
                      <td>
                        <div
                          className="table-action-button"
                          onClick={goToVoucherDetails}
                        >
                          <button>FACE2343D335D</button>
                        </div>
                      </td>
                      <td>
                        <div className="table-action-icons">
                          <div className="mw-130">
                            <div className="table-action-button">
                              <button className="yellow">Repost voucher</button>
                            </div>
                          </div>
                          <div className="action-icon">
                            <DeleteTableSvg />
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
        {openVoucherDetails && (
          <VoucherDetails setOpen={setOpenVoucherDetails} />
        )}
      </FinanceSessionStudentsListingSection>
    </FinanceSessionStudentsListingMain>
  );
};

export default FinanceSessionStudentsListing;
