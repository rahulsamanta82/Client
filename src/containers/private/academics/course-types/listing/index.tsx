import { FC, Fragment, useEffect, useState } from "react";
import {
  CourseTypesListingSection,
  CourseTypesListingMain,
  CourseTypesListingTop,
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
import useAcademics from "../../useHooks";
import { CourseTypeDTO } from "utils/helpers/models/academics/course-type.dto";

interface CourseTypesListingProps { }

const CourseTypesListing: FC<CourseTypesListingProps> = ({ }) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: 'Academics / ', path: siteRoutes.academicSessionListing },
    { title: 'Course Types', path: siteRoutes.courseTypesListing },
  ]
  const navigate = useNavigate();
  // const { getCourseTypes, deleteBankInfo } = useFinance();
  const [data, setData] = useState<CourseTypeDTO[]>([]);
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
  const { getCourseTypes, deleteCourseType } = useAcademics();
  const { handleSearchChange, handleTableSearch } = useUtils();

  const goToCreate = () => {
    navigate(siteRoutes.createCourseType);
  };

  useEffect(() => {
    getAllCourseTypes(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteCourseType(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllCourseTypes(page + 1, search);
  };
  const getAllCourseTypes = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getCourseTypes(setData, queryParams, setPagination);
  };

  const goToEdit = (id: number) => {
    navigate(`${siteRoutes.createCourseType}?id=${id}`);
  }

  return (
    <CourseTypesListingMain>
      <CourseTypesListingTop>
        <div className="left">
          <span className="page-heading">Add Course type</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createCourseType) && (
            <div className="create-fine-slot-btn">
              <button className="lg-rounded-btn" onClick={goToCreate}>
                + Add New
              </button>
            </div>
          )}
        </div>
      </CourseTypesListingTop>

      <CourseTypesListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllCourseTypes)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllCourseTypes)}
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
              {data.map((type, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mw-150">
                        {type.title}
                      </div>
                    </td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon" onClick={() => goToEdit(type.id)}>
                          <EditTableSvg />
                        </div>
                        <div className="action-icon" onClick={() => handleDelete(type.id)}>
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
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination
            {...pagination}
            onPageChange={onPageChange}
          />
        </Fragment>
      </CourseTypesListingSection>
    </CourseTypesListingMain>
  );
};

export default CourseTypesListing;
