import { FC, Fragment, useEffect, useState } from "react";
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
  AcademicGradeTemplatesListingMain,
  AcademicGradeTemplatesListingSection,
  AcademicGradeTemplatesListingTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { GradeTemplateDTO } from "utils/helpers/models/academics/grade-template.dto";
import useAcademics from "../../useHooks";
import { useSelector } from "react-redux";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const AcademicGradeTemplatesListing: FC = () => {
  const { getGradeTemplates, deleteGradeTemplate } = useAcademics();
  const [data, setData] = useState<GradeTemplateDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();
  const columns: string[] = ["Title", "Is Generic", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "Grades Template",
      path: siteRoutes.academicGradeTemplatesListing,
    },
  ];
  const navigate = useNavigate();

  const goToCreateExamType = () => {
    navigate(siteRoutes.createAcademicGradeTemplate);
  };
  const goToManageGradeTemplate = () => {
    navigate(siteRoutes.manageGradeTemplates);
  };
  const goToSyncTemplates = () => {
    navigate(siteRoutes.academicSyncGradeTemplates);
  };

  useEffect(() => {
    getAllGradeTemplates(pagination.page, search);
  }, []);

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllGradeTemplates(page + 1, search);
  };
  const getAllGradeTemplates = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getGradeTemplates(setData, queryParams, setPagination);
  };

  const goToEditGradeTemplate = (id: number) => {
    navigate(`${siteRoutes.createAcademicGradeTemplate}?id=${id}`);
  }

  return (
    <AcademicGradeTemplatesListingMain>
      <AcademicGradeTemplatesListingTop>
        <div className="left">
          <span className="page-heading">Grades Template</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createAcademicGradeTemplate) && <div className="add-new-button">
            <button className="lg-rounded-btn" onClick={goToCreateExamType}>
              + Add Grades Template
            </button>
          </div>}
        </div>
      </AcademicGradeTemplatesListingTop>

      <AcademicGradeTemplatesListingSection className="content-radius-shadow">
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
              onChange={(e) =>
                handleSearchChange(e, setSearch, getAllGradeTemplates)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllGradeTemplates)}
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
              {data.map((template,index) => (
                <tr>
                  <td>
                    <div className="mw-150">{template.title}</div>
                  </td>
                  <td>{template.is_generic == 1 ? 'Yes' : 'No'}</td>
                  <td>
                    <div className="table-action-buttons">
                      <div className="action-icon" onClick={() => goToEditGradeTemplate(template.id)}>
                        <EditTableSvg />
                      </div>
                      <div
                        className="table-action-button"
                        onClick={goToManageGradeTemplate}
                      >
                        <button className="green">Manage Grades</button>
                      </div>
                      <div
                        className="table-action-button"
                        onClick={goToSyncTemplates}
                      >
                        <button className="black">Sync Templates</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <Fragment>
            <Pagination
              onPageChange={onPageChange}
              {...pagination}
            />
          </Fragment>
        </div>
      </AcademicGradeTemplatesListingSection>
    </AcademicGradeTemplatesListingMain>
  );
};

export default AcademicGradeTemplatesListing;
