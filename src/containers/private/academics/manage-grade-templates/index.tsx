import { FC, Fragment, useState } from "react";
import {
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
  ManageGradeTemplatesMain,
  ManageGradeTemplatesSection,
  ManageGradeTemplatesTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import DataNotFound from "components/particles/table/data-not-found";
import GradingSchema from "./components/link-grade-template";
import LinkGradeTemplate from "./components/link-grade-template";

const ManageGradeTemplates: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Letter Grade",
    "Grade Point",
    "Percentage Boundary",
    "Action",
  ];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "Grades Template /",
      path: siteRoutes.academicGradeTemplatesListing,
    },
    { title: "Manage Grades Template", path: siteRoutes.manageGradeTemplates },
  ];
  const [openLinkGrades, setOpenLinkGrades] = useState<boolean>(false);

  const goToLinkGradeTemplate = () => {
    setOpenLinkGrades(true);
  };

  return (
    <ManageGradeTemplatesMain>
      <ManageGradeTemplatesTop>
        <div className="left">
          <span className="page-heading">Manage Grades Template</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="create-org-btn" onClick={goToLinkGradeTemplate}>
            <button className="lg-rounded-btn">+ Link Grades</button>
          </div>
        </div>
      </ManageGradeTemplatesTop>

      <ManageGradeTemplatesSection className="content-radius-shadow">
        <div className="table-heading">Obsolete Agri 100-5CR</div>
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
            {openLinkGrades && (
              <LinkGradeTemplate setOpen={setOpenLinkGrades} />
            )}
          </Fragment>
        </div>
      </ManageGradeTemplatesSection>
    </ManageGradeTemplatesMain>
  );
};

export default ManageGradeTemplates;
