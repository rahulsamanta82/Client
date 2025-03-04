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
  AcademicInvigilatorsListingMain,
  AcademicInvigilatorsListingSection,
  AcademicInvigilatorsListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const AcademicInvigilatorsListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Emp No", "Invigilator Name", "Campus", "Department", "Designation", "CNIC", "Assigned Exams", "Assigned Duties", "Is Teaching", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Invigilators", path: siteRoutes.academicInvigilatorsListing },
  ];
  const navigate = useNavigate();

  const goToCreateInvigilator = () => {
    navigate(siteRoutes.createAcademicInvigilator);
  };

  return (
    <AcademicInvigilatorsListingMain>
      <AcademicInvigilatorsListingTop>
        <div className="left">
          <span className="page-heading">Invigilators</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button">
            <button className="lg-rounded-btn" onClick={goToCreateInvigilator}>
              + Add Fee Invigilator
            </button>
          </div>
        </div>
      </AcademicInvigilatorsListingTop>

      <AcademicInvigilatorsListingSection className="content-radius-shadow">
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
                      300100001
                    </td>
                    <td>
                      <div className="mw-100">
                        Mr. Nazir Ahmed
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">
                        Rahim Yar Khan Campus
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">
                        Department of Physics
                      </div>
                    </td>
                    <td>
                      Assistant Cook
                    </td>
                    <td>31303-1234567-7</td>
                    <td>1</td>
                    <td>0</td>
                    <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <label htmlFor={`is-specialization-no-${index}`}>
                            Yes
                          </label>
                          <input
                            type="radio"
                            name={`is-specialization-${index}`}
                            id={`is-specialization-no-${index}`}
                          />
                        </div>
                        <div className="radio">
                          <label htmlFor={`is-specialization-yes-${index}`}>
                            No
                          </label>
                          <input
                            type="radio"
                            name={`is-specialization-${index}`}
                            id={`is-specialization-yes-${index}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mw-100">
                        <div className="table-action-icons">
                          <div className="action-icon">
                            <EditTableSvg />
                          </div>
                          <div className="action-icon">
                            <DeleteTableSvg />
                          </div>
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
      </AcademicInvigilatorsListingSection>
    </AcademicInvigilatorsListingMain>
  );
};

export default AcademicInvigilatorsListing;
