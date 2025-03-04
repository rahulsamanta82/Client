import { FC, Fragment } from "react";
import { BTLFilters, BTLFilterSection, BTLListingSection, BTLMain, BTLTopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface BankTransactionsLogsListingProps { }

const BankTransactionsLogsListing: FC<BankTransactionsLogsListingProps> = ({ }) => {
  const columns: string[] = [
    "Request Type",
    "User",
    "Transaction ID",
    "Amount",
    "Challan #",
    "IP Address",
    "IP Address"
  ]
  return (
    <BTLMain>
      <BTLTopSection>
        <div className="heading">
          <span className="page-heading">Bank Transitions Log</span>
          <Breadcrumb />
        </div>
      </BTLTopSection>
      <BTLFilterSection className="content-radius-shadow">
        <BTLFilters>
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
              <label htmlFor="cnic">Request Type</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">All Request Types</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="cnic">Challan #</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Challan #" />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="cnic">Transaction #</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Transaction #" />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="cnic">Bank</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">HBL Production</option>
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
              <button
                className="lg-rounded-btn"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </BTLFilters>
      </BTLFilterSection>

      <BTLListingSection className="content-radius-shadow">
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
              {[1, 1, 1].map((item, index) => {
                return <tr key={index}>
                  <td>Inquiry</td>
                  <td>HBL Production</td>
                  <td>11022387</td>
                  <td>40983</td>
                  <td>2331773882</td>
                  <td>104.123.34.41</td>
                  <td>2023-12-09 15:09:07</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination page={1} onPageChange={e => console.log(e)} per_page={10} totalRecords={40} />
        </Fragment>
      </BTLListingSection>
    </BTLMain>
  )
}

export default BankTransactionsLogsListing;