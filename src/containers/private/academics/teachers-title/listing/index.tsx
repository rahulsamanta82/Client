import { FC, Fragment, useEffect, useState } from "react";
import {
  TeachersTitlesListingSection,
  TeachersTitlesListingMain,
  TeachersTitlesListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import { TeachersTitleDTO } from "utils/helpers/models/academics/teachers-title.dto";
import useAcademics from "../../useHooks";

interface TeachersTitlesListingProps { }

const TeachersTitlesListing: FC<TeachersTitlesListingProps> = ({ }) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: 'Authority & Committees / ', path: siteRoutes.academicSessionListing },
    { title: 'Teachers titles', path: siteRoutes.teachersTitlesListing },
  ]
  const navigate = useNavigate();
  const [data, setData] = useState<TeachersTitleDTO[]>([]);
  const { getTeachersTitles, deleteTeachersTitle} = useAcademics();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const columns: string[] = [
    "Title",
    "Action",
  ];

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const goToCreate = () => {
    navigate(siteRoutes.createTeachersTitle);
  };

  useEffect(() => {
    getAllTeachersTitles(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteTeachersTitle(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllTeachersTitles(page + 1, search);
  };
  const getAllTeachersTitles = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getTeachersTitles(setData, queryParams, setPagination);
  };

  const goToEdit = (id: number) => {
    navigate(`${siteRoutes.createTeachersTitle}?id=${id}`)
  }

  return (
    <TeachersTitlesListingMain>
      <TeachersTitlesListingTop>
        <div className="left">
          <span className="page-heading">Teachers titles</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createTeachersTitle) && (
            <div className="create-fine-slot-btn">
              <button className="lg-rounded-btn" onClick={goToCreate}>
                + Add New
              </button>
            </div>
          )}
        </div>
      </TeachersTitlesListingTop>

      <TeachersTitlesListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllTeachersTitles)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllTeachersTitles)}
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
              {data.map((title, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mw-150">
                        {title.title}
                      </div>
                    </td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon" onClick={() => goToEdit(title.id)}>
                          <EditTableSvg />
                        </div>
                        <div className="action-icon" onClick={() => handleDelete(title.id)}>
                          <DeleteTableSvg />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
        <DataNotFound show={!isLoading && !data.length}/>
          <Pagination
            {...pagination}
            onPageChange={onPageChange}
          />
        </Fragment>
      </TeachersTitlesListingSection>
    </TeachersTitlesListingMain>
  );
};

export default TeachersTitlesListing;
