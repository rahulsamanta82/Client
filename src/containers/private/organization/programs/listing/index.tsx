import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  LinkIconSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import { useNavigate } from "react-router-dom";
import {
  ProgramsListingMain,
  ProgramsListingSection,
  ProgramsListingTop,
} from "./style";
import useAlert from "hooks/useAlert";
import useOrganization from "../../useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useStore from "hooks/useStore";
import ManageCriteria from "./components/manage-criteria";
import ManageSeats from "./components/manage-seats";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";
import LinkProgramToAdmissionCampaign from "./components/link-program";
import UpdateLinkedProgram from "./components/update-linked-program";

interface ProgramsListingProps {}

const ProgramsListing: FC<ProgramsListingProps> = ({}) => {
  const [openManageCriteriaModal, setOpenManageCriteriaModal] = useState(false);
  const [openManageSeatsModal, setOpenManageSeatsModal] = useState(false);
  const [openLinkProgramModal, setOpenLinkProgramModal] = useState(false);
  const [openUpdateLinkedProgramModal, setOpenUpdateLinkedProgramModal] =
    useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [admissionSessionToUpdate, setAdmissionSessionToUpdate] =
    useState<any>();
  const { getProgramsBySessionId } = useAdmissions();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { confirmationPopup } = useAlert();
  const { getQueryParams, handleSearchChange, handleTableSearch } = useUtils();
  const params = getQueryParams();
  const { hasAccess } = useStore();
  const {
    getPrograms,
    deleteProgram,
    downloadProgramsExcelFile,
    downloadProgramsPdfFile,
  } = useOrganization();
  const { getDateFromDateTime } = useUtils();
  const columns: string[] = [
    "",
    "Program Name",
    "Department",
    "Campus",
    "Credit Hours",
    "Program Type",
  ];
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const goToCreateProgram = () => {
    navigate(siteRoutes.createProgram);
  };

  const goToUpdateProgram = (id: number) => {
    navigate(`${siteRoutes.createProgram}?id=${id}`);
  };
  const goToEligiblityTemplates = (program: any) => {
    const { id, title, admission_session } = program;

    navigate(
      `${siteRoutes.eligibilityTemplatesListing}?id=${id}&title=${title}&admission_session_id=${admission_session?.id}`
    );
  };

  const toggleRowExpand = (index: number) => {
    const programs = [...data];
    programs[index].isExpanded = !programs[index].isExpanded;
    setData([...programs]);
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      const queryParams = {
        per_page: pagination.per_page,
        page: 1,
      };
      deleteProgram(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllPrograms(page + 1, search);
  };

  const getAllPrograms = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };

    if (params?.admission_session_id) {
      getProgramsBySessionId(params?.admission_session_id, setData);
    } else {
      getPrograms(setData, queryParams, setPagination);
    }
  };

  useEffect(() => {
    getAllPrograms(pagination.page, search);
  }, []);

  const goToLinkEntryTest = (program: any) => {
    const { admission_session, id, title } = program;
    navigate(
      `${siteRoutes.linkedProgramEntryTestListing}?admission_session_id=${admission_session?.id}&id=${id}&title=${title}`
    );
  };

  // const handleOpenManageCriteriaModal = (id: number) => {
  //   setOpenManageCriteriaModal(true);
  //   navigate(
  //     `${siteRoutes.programListing}?sessionId=${params?.sessionId}&id=${id}`
  //   );
  // };

  // const handleOpenManageSeatsModal = (id: number) => {
  //   setOpenManageSeatsModal(true);
  //   navigate(
  //     `${siteRoutes.programListing}?sessionId=${params?.sessionId}&id=${id}`
  //   );
  // };
  const navigateToLinkedSpecialization = (program: any) => {
    const { admission_session } = program;
    navigate(
      `${siteRoutes.linkedSpecializationListing}?admission_session_id=${admission_session?.id}`
    );
  };
  const goToLinkMeritList = (program: any) => {
    const { id, title, admission_session } = program;
    navigate(
      `${siteRoutes.programLinkMeritList}?program_id=${id}&program_title=${title}&admission_session_id=${admission_session?.id}`
    );
  };
  const handleOpenUpdateLinkedProgram = (program: any) => {
    const { admission_session } = program;
    setOpenUpdateLinkedProgramModal(true);
    setAdmissionSessionToUpdate(admission_session);
  };

  return (
    <ProgramsListingMain>
      <ProgramsListingTop>
        <div className="left">
          <span className="page-heading">Program Listing</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createProgram) &&
            !params?.admission_session_id && (
              <div className="create-btn">
                <button className="lg-rounded-btn" onClick={goToCreateProgram}>
                  + Add Program
                </button>
              </div>
            )}

          {params?.admission_session_id && (
            <div className="create-btn">
              <button
                className="lg-rounded-btn link-btn"
                onClick={() => setOpenLinkProgramModal(true)}
              >
                <div className="icon">
                  <LinkIconSvg />
                </div>
                Link Program
              </button>
            </div>
          )}
        </div>
      </ProgramsListingTop>
      <ProgramsListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadProgramsPDF) && (
              <div className="export-btn" onClick={downloadProgramsPdfFile}>
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadProgramsExcel) && (
              <div className="export-btn" onClick={downloadProgramsExcelFile}>
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            )}
          </div>
          <div className="table-search-field">
            <span className="search-icon">
              <SearchFieldSvg className="icon" />
            </span>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearchChange(e, setSearch, getAllPrograms)}
              onKeyUp={(e) => handleTableSearch(e, getAllPrograms)}
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
              {data.map((item: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${item.isExpanded && "opened"}`}>
                      <td>
                        <div
                          className="rounded-expand-button"
                          onClick={() => toggleRowExpand(index)}
                        >
                          <span>{item.isExpanded ? "-" : "+"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="mw-150">{item.title}</div>
                      </td>
                      <td>{item?.category?.title}</td>
                      <td>
                        <div className="mw-150">-</div>
                      </td>
                      <td>{`${item?.min_credit_hrs} - ${item?.max_credit_hrs}`}</td>
                      <td>{item.program_type}</td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Duration</span>
                              <span className="info">{item?.years} Years</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">
                                Interview Passing Marks
                              </span>
                              <span className="info">
                                {item?.interview_passing_marks}
                              </span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Program Level</span>
                              <div className="info">
                                <span className="status">
                                  {item?.level?.title}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Program Shortcuts</span>
                              <div className="info">
                                <span className="status">{item?.code}</span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Degree Title</span>
                              <div className="info">
                                <span className="status">
                                  {item?.degree_title}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Years of Education</span>
                              <div className="info">
                                <span className="status">
                                  {item?.years_of_education}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Samester</span>
                              <div className="info">
                                <span className="status">
                                  {item?.semesters}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Program Shift</span>
                              <div className="info">
                                <span className="status">
                                  {item?.program_shift}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">
                                Student Registration Prefix
                              </span>
                              <div className="info">
                                <span className="status">
                                  {item?.reg_prefix}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Course Repeat Fee</span>
                              <div className="info">
                                <span className="status">
                                  {item?.course_repeat_fee}
                                </span>
                              </div>
                            </div>

                            {params?.admission_session_id ? (
                              <div>
                                <div className="particular-info">
                                  <span className="title">Fee Due Date</span>
                                  <div className="info">
                                    <span className="status">
                                      {getDateFromDateTime(
                                        item?.admission_session?.fee_due_date
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="particular-info">
                                  <span className="title">
                                    Class Start Date
                                  </span>
                                  <div className="info">
                                    <span className="status">
                                      {getDateFromDateTime(
                                        item?.admission_session
                                          ?.class_start_date
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="particular-info">
                              <span className="title">Status</span>
                              <div className="info">
                                {item?.admission_session?.admission_status ? (
                                  <span className="status-tile green">
                                    Active
                                  </span>
                                ) : (
                                  <span className="status-tile yellow">
                                    Inactive
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  {hasAccess(sitePermissions.editProgram) &&
                                    !params?.admission_session_id && (
                                      <div
                                        className="action-icon"
                                        onClick={() =>
                                          goToUpdateProgram(item?.id)
                                        }
                                      >
                                        <EditTableSvg />
                                      </div>
                                    )}

                                  {params?.admission_session_id ? (
                                    <div
                                      className="action-button"
                                      onClick={() => goToLinkMeritList(item)}
                                    >
                                      <button className="criteria-btn">
                                        Link Merit
                                      </button>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {params?.admission_session_id ? (
                                    <div
                                      className="action-button"
                                      onClick={() =>
                                        goToEligiblityTemplates(item)
                                      }
                                    >
                                      <button>Link Eligibility</button>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {!params?.admission_session_id && (
                                    <div className="action-button">
                                      <button>Manage Exam In charge</button>
                                    </div>
                                  )}
                                  {params?.admission_session_id && (
                                    <Fragment>
                                      {/* {hasAccess(
                                        sitePermissions.manageProgramCriteria
                                      ) && (
                                        <div
                                          className="action-button"
                                          // onClick={() =>
                                          //   handleOpenManageCriteriaModal(
                                          //     item?.id
                                          //   )
                                          // }
                                        >
                                          <button className="criteria-btn">
                                            Manage Criteria
                                          </button>
                                        </div>
                                      )} */}
                                      {/* {hasAccess(
                                        sitePermissions.manageProgramSeats
                                      ) && (
                                        <div
                                          className="action-button"
                                          // onClick={() =>
                                          //   handleOpenManageSeatsModal(item?.id)
                                          // }
                                        >
                                          <button className="seats-btn">
                                            Manage Seats
                                          </button>
                                        </div>
                                      )} */}

                                      {hasAccess(
                                        sitePermissions.linkedSpecializationListing
                                      )}

                                      <div className="action-button">
                                        <button
                                          className="special-btn"
                                          onClick={() =>
                                            navigateToLinkedSpecialization(item)
                                          }
                                        >
                                          Specialization
                                        </button>
                                      </div>

                                      {hasAccess(
                                        sitePermissions.linkedProgramEntryTestListing
                                      ) && (
                                        <div
                                          className="action-button"
                                          onClick={() =>
                                            goToLinkEntryTest(item)
                                          }
                                        >
                                          <button className="entry-test-btn">
                                            Link Entry Test
                                          </button>
                                        </div>
                                      )}
                                    </Fragment>
                                  )}

                                  {hasAccess(sitePermissions.deleteProgram) &&
                                    !params?.admission_session_id && (
                                      <div
                                        className="action-icon"
                                        onClick={() => handleDelete(item?.id)}
                                      >
                                        <DeleteTableSvg />
                                      </div>
                                    )}

                                  {params?.admission_session_id && (
                                    <div
                                      className="action-icon"
                                      onClick={() =>
                                        handleOpenUpdateLinkedProgram(item)
                                      }
                                    >
                                      <EditTableSvg />
                                    </div>
                                  )}
                                </div>
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </ProgramsListingSection>
      {openManageCriteriaModal && (
        <ManageCriteria setOpen={setOpenManageCriteriaModal} />
      )}
      {openManageSeatsModal && (
        <ManageSeats setOpen={setOpenManageSeatsModal} />
      )}
      {openLinkProgramModal && (
        <LinkProgramToAdmissionCampaign
          Program_id={data.map((d) => d.id)}
          admission_session_id={params?.admission_session_id}
          setOpen={setOpenLinkProgramModal}
          setData={setData}
        />
      )}
      {openUpdateLinkedProgramModal && (
        <UpdateLinkedProgram
          setOpen={setOpenUpdateLinkedProgramModal}
          admissionSession={admissionSessionToUpdate}
          setPrograms={setData}
          programs={data}
        />
      )}
    </ProgramsListingMain>
  );
};

export default ProgramsListing;
