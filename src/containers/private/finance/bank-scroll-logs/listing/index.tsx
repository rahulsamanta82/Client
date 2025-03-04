import { FC, Fragment } from "react";
import { BSLFilters, BSLFilterSection, BSLListingSection, BSLMain, BSLTopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface BankScrollLogsListingProps { }

const BankScrollLogsListing: FC<BankScrollLogsListingProps> = ({ }) => {
  const columns: string[] = [
    "Branch Code",
    "Branch Name",
    "Collection Date",
    "Amount",
    "Student ID",
    "Dept Code",
    "File Name",
    "Linked TID",
    ]
    return (
        <BSLMain>
            <BSLTopSection>
                <div className="heading">
                    <span className="page-heading">Bank Transitions Log</span>
                    <Breadcrumb />
                </div>
            </BSLTopSection>
    <BSLFilterSection className="content-radius-shadow">
          <BSLFilters>
            <div className="filter-fields">
              <div className="input-field">
                <label htmlFor="cnic">From Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="cnic">To Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="cnic">Challan no.</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Challan #" />
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
                <button
                  className="lg-rounded-btn"
                >
                    Apply Filter
                </button>
              </div>
            </div>
          </BSLFilters>
      </BSLFilterSection>

      <BSLListingSection className="content-radius-shadow">
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
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                          {[1,1,1].map((item,index) => {
                            return <tr key={index}>
                              <td>100</td>
                              <td>IQBAL CHOWK, ALIPUR,</td>
                              <td>24-07-2024</td>
                              <td>68260.00</td>
                              <td>2427389470</td>
                              <td>01</td>
                              <td>bt_25072024_2020_am.xls</td>
                              <td>152500</td>
                            </tr>
                          })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                  <Pagination page={1} onPageChange={e => console.log(e)} per_page={10} totalRecords={40}/>
                </Fragment>
            </BSLListingSection>
        </BSLMain>
    )
}

export default BankScrollLogsListing;