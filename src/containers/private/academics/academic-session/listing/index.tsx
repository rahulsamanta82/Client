import { FC, Fragment, useEffect, useState } from "react";
import {
  AcademicSessionListingSection,
  AcademicSessionListingTop,
  AcademicSessionListingMain,
} from "./style";
import {
  EditTableSvg,
  ExcelSvg,
  MinusRedSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import useAcademics from "../../useHooks";
import { AcademicSessionDTO } from "utils/helpers/models/academics/academic-session.dto";
import { useSelector } from "react-redux";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import Pagination from "components/particles/table/pagination";
import DataNotFound from "components/particles/table/data-not-found";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AcademicSessionListingProps { }

const AcademicSessionListing: FC<AcademicSessionListingProps> = ({ }) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: "" },
    { title: "Academic Sessions", path: siteRoutes.academicSessionListing },
  ];

  const columns: string[] = [
    "",
    "Semester Sequency No.",
    "Year",
    "Semester Type",
    "Enrollment Start Date",
    "Enrollment Close Date",
    // "Total Courses",
    // "Total Students",
    "Status",
  ];
  const navigate = useNavigate();
  const { getAcademicSessions, deleteAcademicSession } = useAcademics();
  const [data, setData] = useState<AcademicSessionDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  useEffect(() => {
    getAllAcademicSessions(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteAcademicSession(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAcademicSessions(page + 1, search);
  };
  const getAllAcademicSessions = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getAcademicSessions(setData, queryParams, setPagination);
  };

  const toggleRowExpand = (index: number) => {
    (data as any)[index].isExpanded = !(data as any)[index].isExpanded;
    setData([...data]);
  };

  const goToEdit = (id: number) => {
    navigate(`${siteRoutes.createAcademicSession}?id=${id}`);
  }

  const goToManageAcademicSession = (session_id: number) => {
    navigate(`${siteRoutes.academicSessionManagementListing}?session_id=${session_id}`);
  };

  const goToCourseGroupsListing = () => {
    navigate(siteRoutes.academicCourseGroupListing);
  };

  const goToCreateAcademicSession = () => {
    navigate(siteRoutes.createAcademicSession);
  };

  return (
    <AcademicSessionListingMain>
      <AcademicSessionListingTop>
        <div className="left">
          <span className="page-heading">Academic Sessions</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createAcademicSession) && <div className="create-org-btn" onClick={goToCreateAcademicSession}>
            <button className="lg-rounded-btn">
              + Add previous academic session
            </button>
          </div>}
        </div>
      </AcademicSessionListingTop>
      <AcademicSessionListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
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
                handleSearchChange(e, setSearch, getAllAcademicSessions)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAcademicSessions)}
            />          </div>
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
              {data.map((session, index) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${(session as any).isExpanded && "opened"}`}>
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{(session as any).isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>{session.semester_sequence_no}</td>
                      <td>
                        {session.year}
                      </td>
                      <td>{session.type}</td>
                      <td>{session.enrol_start_date}</td>
                      <td>{session.enrol_end_date}</td>
                      {/* <td>10,440</td> */}
                      {/* <td>42,826</td> */}
                      <td>
                        {session.is_active == 1 ? <span className="status-tile">Active</span> : <span className="status-tile red">Inactive</span>}
                      </td>
                    </tr>

                    {(session as any).isExpanded && (
                      <tr>
                        <td colSpan={9}>
                          <div className="expanded-content">
                            <div className="table-action-buttons">
                              <div className="action-icon" onClick={() => handleDelete(session.id)}>
                                <MinusRedSvg />
                              </div>
                              <div className="action-icon" onClick={() => goToEdit(session.id)}>
                                <EditTableSvg />
                              </div>
                              {hasAccess(sitePermissions.academicSessionManagementListing) && <div
                                className="table-action-button"
                                onClick={() => goToManageAcademicSession(session.id)}
                              >
                                <button className="green">
                                  Management Academic Session
                                </button>
                              </div>}
                              <div className="table-action-button black">
                                <button>Faculty Workload CSV</button>
                              </div>
                              {hasAccess(sitePermissions.academicCourseGroupListing) && 
                              <div
                                className="table-action-button purple"
                                onClick={goToCourseGroupsListing}
                              >
                                <button className="purple">
                                  Course Groups
                                </button>
                              </div>}
                              <div className="table-action-button">
                                <button className="red">
                                  Course Anomalies
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!isLoading && !data.length} />
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </AcademicSessionListingSection>
    </AcademicSessionListingMain>
  );
};

export default AcademicSessionListing;

