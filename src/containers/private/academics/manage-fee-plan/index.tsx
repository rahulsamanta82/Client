import { FC, Fragment, useState } from "react";
import {
  DeleteTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  ManageAcademicFeePlanListingMain,
  ManageAcademicFeePlanListingSection,
  ManageAcademicFeePlanListingTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import AddParticulars from "./components/add-particulars";

const ManageAcademicFeePlanListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Particular Head", "Amount", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Academic Sessions / ", path: siteRoutes.academicSessionListing },
    {
      title: "Manage Fee Plan(FoA-Foisl-FoEdu-MA-BS-MORN-2nd Sem)",
      path: siteRoutes.academicManageFeePlanListing,
    },
  ];
  const [openParticular, setOpenParticular] = useState<boolean>(false);

  const goToParticulars = () => {
    setOpenParticular(true);
  };

  return (
    <ManageAcademicFeePlanListingMain>
      <ManageAcademicFeePlanListingTop>
        <div className="left">
          <span className="page-heading">Manage Fee Plan</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button" onClick={goToParticulars}>
            <button className="lg-rounded-btn">+ Add Particular</button>
          </div>
        </div>
      </ManageAcademicFeePlanListingTop>

      <ManageAcademicFeePlanListingSection className="content-radius-shadow">
        <div className="table-info-section">
          <div className="left-section">
            <div className="heading">
              <span>FoA-FoIsl-FoEdu-MA-BS-MORN-2nd Sem</span>
            </div>
          </div>
          <div className="right-section">
            <div className="heading">
              <span className="text-primary">Total Amount: 31980</span>
            </div>
          </div>
        </div>
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
                      <div className="mw-150">Identity Card fee</div>
                    </td>
                    <td>Yes</td>
                    <td>
                      <div className="table-action-icons">
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
            {openParticular && <AddParticulars setOpen={setOpenParticular} />}
          </Fragment>
        </div>
      </ManageAcademicFeePlanListingSection>
    </ManageAcademicFeePlanListingMain>
  );
};

export default ManageAcademicFeePlanListing;
