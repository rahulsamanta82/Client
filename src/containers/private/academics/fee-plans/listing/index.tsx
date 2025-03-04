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
  AcademicFeePlanListingMain,
  AcademicFeePlanListingSection,
  AcademicFeePlanListingTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const AcademicFeePlanListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Name",
    "Is Active",
    "Total Amount",
    "Total Active Students",
    "Action",
  ];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Fee Plans", path: siteRoutes.academicFeePlansListing },
  ];
  const navigate = useNavigate();

  const goToCreateFeePlan = () => {
    navigate(siteRoutes.createAcademicFeePlan);
  };
  const goToManageFeePlan = () => {
    navigate(siteRoutes.academicManageFeePlanListing);
  };

  return (
    <AcademicFeePlanListingMain>
      <AcademicFeePlanListingTop>
        <div className="left">
          <span className="page-heading">Fee Plans </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button">
            <button className="lg-rounded-btn" onClick={goToCreateFeePlan}>
              + Add Fee Plan
            </button>
          </div>
        </div>
      </AcademicFeePlanListingTop>

      <AcademicFeePlanListingSection className="content-radius-shadow">
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
                      <div className="mw-150">
                        FoA-Foisl-FoEdu-MA-BS-MORN-2nd Sem
                      </div>
                    </td>
                    <td>Yes</td>
                    <td>318906</td>
                    <td>7654</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>
                        <div className="table-action-button">
                          <button className="green">Copy & Create New</button>
                        </div>
                        <div
                          className="table-action-button"
                          onClick={goToManageFeePlan}
                        >
                          <button className="black"> Manage Fee</button>
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
      </AcademicFeePlanListingSection>
    </AcademicFeePlanListingMain>
  );
};

export default AcademicFeePlanListing;
