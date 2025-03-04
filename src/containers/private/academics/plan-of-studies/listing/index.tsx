import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  DownloadPrimaryTableSvg,
  EditGreenTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  StudenSvg,
  STudyPlanSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  PlanofStudiesListingMain,
  PlanofStudiesListingSection,
  PlanofStudiesListingTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { PlanOfStudyDTO } from "utils/helpers/models/academics/plan-of-study.dto";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useAcademics from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface PlanofStudiesListingProps {}

const PlanofStudiesListing: FC<PlanofStudiesListingProps> = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Plan Of Studies", path: siteRoutes.academicPlanofStudies },
  ];
  const columns: string[] = [
    "Plan Of Studies",
    "Program",
    "Total Course",
    "Total Student",
    "Total Semesters",
    "Total Credit Hours (Therory - Labs)",
    "Status",
    "Action",
  ];
  const navigate = useNavigate();
  const { getPlanOfStudies, deletePlanOfStudy} = useAcademics();
  const [data, setData] = useState<PlanOfStudyDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();
  const [search, setSearch] = useState<string>("");

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deletePlanOfStudy(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllPlanOfStudies(page + 1, search);
  };
  const getAllPlanOfStudies = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getPlanOfStudies(setData, queryParams, setPagination);
  };

  const goToCreateStudyPlan = () => {
    navigate(siteRoutes.createStudyPlans);
  };

  const goToStudyPlanCourse = () => {
    navigate(siteRoutes.planOfStudyCourseListing);
  };
  const goToStudyPlanStudent = () => {
    navigate(siteRoutes.planOfStudyStudentListing);
  };

  const toggleRowMenuDropdown = (index: number) => {
    (data as any)[index].isDropdownOpen = !(data as any)[index].isDropdownOpen;
    setData([...data]);
  }

  useEffect(() => {
    getAllPlanOfStudies(pagination.page, search);
  }, []);

  return (
    <PlanofStudiesListingMain>
      <PlanofStudiesListingTop>
        <div className="left">
          <span className="page-heading">Plan Of Studies</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createStudyPlans) && <div className="create-org-btn">
            <button onClick={goToCreateStudyPlan} className="lg-rounded-btn">
              + Add Plan of Study
            </button>
          </div>}
        </div>
      </PlanofStudiesListingTop>

      <PlanofStudiesListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllPlanOfStudies)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllPlanOfStudies)}
            />          </div>
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
              {data.map((plan, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mw-150">
                        {plan.title}
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">
                        BS Computer Science
                      </div>
                    </td>
                    <td>11</td>
                    <td>324</td>
                    <td>
                      {plan.total_semesters}
                    </td>
                    <td>33(33-0)</td>
                    <td>
                      <div>
                        <span className="status-tile">Active</span>
                      </div>
                    </td>

                    <td>
                      <div className="action-menu">
                        <div
                          className="menu-icon cp"
                          onClick={() => toggleRowMenuDropdown(index)}
                        >
                          <TabPrimaryActionMenu className="icon" />
                        </div>

                        {(plan as any).isDropdownOpen && (
                          <div className="menu-dropdown">
                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <EditGreenTableSvg className="icon" />
                              </div>
                              <span className="title">Edit</span>
                            </div>
                            <div
                              className="particular-menu cp"
                              onClick={goToStudyPlanCourse}
                            >
                              <div className="action-icon">
                                <STudyPlanSvg className="icon" />
                              </div>
                              <span className="title">
                                Plan of Study Courses
                              </span>
                            </div>
                            <div className="particular-menu cp">
                              <div className="action-icon">
                                <DownloadPrimaryTableSvg className="icon" />
                              </div>
                              <span className="title">Download</span>
                            </div>
                            <div
                              className="particular-menu cp"
                              onClick={goToStudyPlanStudent}
                            >
                              <div className="action-icon">
                                <StudenSvg className="icon" />
                              </div>
                              <span className="title">
                                Plan of Study Students
                              </span>
                            </div>

                            <div className="particular-menu cp" onClick={() => handleDelete(plan.id)}>
                              <div className="action-icon">
                                <DeleteTableSvg className="icon" />
                              </div>
                              <span className="title">Delete</span>
                            </div>
                          </div>
                        )}
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </PlanofStudiesListingSection>
    </PlanofStudiesListingMain>
  );
};

export default PlanofStudiesListing;
