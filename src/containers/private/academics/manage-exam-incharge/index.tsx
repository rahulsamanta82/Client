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
  ManageExamInchargeListingMain,
  ManageExamInchargeListingSection,
  ManageExamInchargeListingTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const ManageExamIncharge: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Program", "Department", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "Manage Exam Incharge",
      path: siteRoutes.academicManageExamIncharge,
    },
  ];
  const [openParticular, setOpenParticular] = useState<boolean>(false);

  const navigate = useNavigate();

  const goToExamIncharge = () => {
    navigate(siteRoutes.academicExamIncharge);
  };

  return (
    <ManageExamInchargeListingMain>
      <ManageExamInchargeListingTop>
        <div className="left">
          <span className="page-heading">Manage Exam Incharge</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right"></div>
      </ManageExamInchargeListingTop>

      <ManageExamInchargeListingSection className="content-radius-shadow">
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
                        <div
                          className="action-button"
                          onClick={goToExamIncharge}
                        >
                          <button className="primary">Exam Incharge</button>
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
      </ManageExamInchargeListingSection>
    </ManageExamInchargeListingMain>
  );
};

export default ManageExamIncharge;
