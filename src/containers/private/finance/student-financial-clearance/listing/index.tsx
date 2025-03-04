import { FC, Fragment } from "react";
import { SFCFilters, SFCFilterSection, SFCListingSection, SFCMain, SFCTopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface StudentFinancialClearanceListingProps { }

const StudentFinancialClearanceListing: FC<StudentFinancialClearanceListingProps> = ({ }) => {
  const columns: string[] = [
    "Challan",
    "Status",
    "Remarks",
    "Additional remarks",
    "Created at",
    "Updated at"
  ]
    return (
        <SFCMain>
            <SFCTopSection>
                <div className="heading">
                    <span className="page-heading">Student Financial Clearance</span>
                    <Breadcrumb />
                </div>
            </SFCTopSection>
    <SFCFilterSection className="content-radius-shadow">
          <SFCFilters>
            <div className="filter-fields">
              <div className="input-field">
                <label htmlFor="cnic">CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Enter CNIC"/>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="cnic">Registration Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" placeholder="Enter Registration Number"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn"
                >
                    Search
                </button>
              </div>
            </div>
          </SFCFilters>
      </SFCFilterSection>

      <SFCListingSection className="content-radius-shadow">
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
                        </tbody>
                    </table>
                </div>
                <Fragment>
                  <Pagination page={1} onPageChange={e => console.log(e)} per_page={10} totalRecords={40}/>
                </Fragment>
            </SFCListingSection>
        </SFCMain>
    )
}

export default StudentFinancialClearanceListing;