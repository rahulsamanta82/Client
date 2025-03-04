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
  ExamInchargeMain,
  ExamInchargeSection,
  ExamInchargeTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import AddParticulars from "./components/add-exam-incharge";
import AddExamIncharge from "./components/add-exam-incharge";

const ExamIncharge: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "In charge Username",
    "Campus",
    "Semesters Allowed",
    "Can Verify?",
    "Action",
  ];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "manage Exam Incharge / ",
      path: siteRoutes.academicManageExamIncharge,
    },
    {
      title: "Exam Incharge",
      path: siteRoutes.academicExamIncharge,
    },
  ];
  const [openAddExamIncharge, setOpenAddExamIncharge] =
    useState<boolean>(false);

  const goToAddExamIncharge = () => {
    setOpenAddExamIncharge(true);
  };

  return (
    <ExamInchargeMain>
      <ExamInchargeTop>
        <div className="left">
          <span className="page-heading">Exam Incharge</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button" onClick={goToAddExamIncharge}>
            <button className="lg-rounded-btn">+ Add Exam Incharge</button>
          </div>
        </div>
      </ExamInchargeTop>

      <ExamInchargeSection className="content-radius-shadow">
        <div className="table-info-section">
          <div className="left-section">
            <div className="heading">
              <span>BS (Hons() Agriculture (M))</span>
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
                      <div className="mw-150">Samina.fatima</div>
                    </td>
                    <td>
                      <div className="table-field">
                        <select id="">
                          <option value="">Bahawalpur</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="table-field">
                        <select id="">
                          <option value="">MultiSelect</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="table-field">
                        <select id="">
                          <option value="">Yes</option>
                        </select>
                      </div>
                    </td>
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
            {openAddExamIncharge && (
              <AddExamIncharge setOpen={setOpenAddExamIncharge} />
            )}
          </Fragment>
        </div>
      </ExamInchargeSection>
    </ExamInchargeMain>
  );
};

export default ExamIncharge;
