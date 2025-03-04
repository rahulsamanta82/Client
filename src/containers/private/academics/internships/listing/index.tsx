import { FC, Fragment, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  AcademicInternshipsListingMain,
  AcademicInternshipsListingSection,
  AcademicInternshipsListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const AcademicInternshipsListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Reg Number", "Student Name", "CNIC", "Organization", "From Date", "To Date", "Offer Letter No", "Completion Letter No", "Status", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Internships", path: siteRoutes.academicInternshipsListing },
  ];
  const navigate = useNavigate();

  const goToCreateInvigilator = () => {
    navigate(siteRoutes.createAcademicInternship);
  };

  return (
    <AcademicInternshipsListingMain>
      <AcademicInternshipsListingTop>
        <div className="left">
          <span className="page-heading">Internships</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button">
            <button className="lg-rounded-btn" onClick={goToCreateInvigilator}>
              + Add Internship
            </button>
          </div>
        </div>
      </AcademicInternshipsListingTop>

      <AcademicInternshipsListingSection className="content-radius-shadow">
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
                    <td>
                      300100001fafsdgwrc
                    </td>
                    <td>
                      <div className="mw-100">
                        Mr. Nazir Ahmed
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">
                        31301-1231231-1
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">
                        Sharex Laboratories(pvt) limited
                      </div>
                    </td>
                    <td>
                      2022-04-05
                    </td>
                    <td>2022-04-05</td>
                    <td>123-BCF-222</td>
                    <td>123-ASD</td>
                    <td>In Progress</td>
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
      </AcademicInternshipsListingSection>
    </AcademicInternshipsListingMain>
  );
};

export default AcademicInternshipsListing;
