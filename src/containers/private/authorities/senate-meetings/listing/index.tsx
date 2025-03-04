import { FC, Fragment, useEffect, useState } from "react";
import {
  SenateMeetingListingMain,
  SenateMeetingListingSection,
  SenateMeetingListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  AddProgramTableSvg,
  AddTablSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import {
  confirmationPopup,
  warningToaster,
} from "utils/helpers/common/alert-service";

import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import AllocateTeacher from "./components/edit-attendance";
import useAuthorities from "../../useHooks";
import { AuthorityMeetingdDTO } from "utils/helpers/models/authorities/authority-meeting.dto";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import EditAttendance from "./components/edit-attendance";

const SenateMeetingListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { hasAccess } = useStore();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [search, setSearch] = useState<string>("");

  const {
    getAcademicNotification,
    getAuthorityMeetings,
    deleteAuthorityMeetingById,
  } = useAuthorities();
  const {
    handleTableSearch,
    handleSearchChange,
    concatPathWithBackendUrl,
    downloadFileWithUrl,
  } = useUtils();
  const columns: string[] = [
    "Date",
    "Title",
    "Created By",
    "Document",

    "Action",
  ];

  const navigate = useNavigate();
  const [data, setData] = useState<AuthorityMeetingdDTO[]>([]);
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteAuthorityMeetingById(id, setData, pagination, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllMeetings(page + 1, search);
  };

  const getAllMeetings = (page: number, search: string) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      authority_id: params.id,
    };
    getAuthorityMeetings(setData, queryParams, setPagination);
  };

  const goToCreateMeetings = (authorityId: number) => {
    navigate(`${siteRoutes.createSenateMeeting}?authority_id=${authorityId}`);
  };
  const [editAttendance, setEditAttendence] = useState<boolean>(false);

  const handleEditAttendance = (meetingId: number) => {
    setEditAttendence(true);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('meetingId', meetingId.toString());
    window.history.pushState({}, '', currentUrl);
  };


  useEffect(() => {
    getAllMeetings(pagination.page, search);
  }, []);

  console.log("data meeting", data);

  const goToDownloadDocument = (path: string | null) => {
    if (path) {
      const concatenatedPath = concatPathWithBackendUrl(path);
      downloadFileWithUrl(concatenatedPath);
    } else {
      warningToaster("File doesn't exist or corrupted");
    }
  };

  return (
    <SenateMeetingListingMain>
      <SenateMeetingListingTop>
        <div className="left">
          <span className="page-heading">Senate Meetings</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button
              className="lg-rounded-btn"
              onClick={() => goToCreateMeetings(params.id)}
            >
              + Add New
            </button>
          </div>
        </div>
      </SenateMeetingListingTop>
      <SenateMeetingListingSection className="content-radius-shadow">
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
              onChange={(e) => handleSearchChange(e, setSearch, getAllMeetings)}
              onKeyUp={(e) => handleTableSearch(e, getAllMeetings)}
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
                const agenda = item.attachments?.find(
                  (att: any) => att.type === "agenda"
                );
                const workingPaper = item.attachments?.find(
                  (att: any) => att.type === "working-paper"
                );
                const minutes = item.attachments?.find(
                  (att: any) => att.type === "minutes"
                );
                const notice = item.attachments?.find(
                  (att: any) => att.type === "notice"
                );

                return (
                  <tr>
                    <td>{item?.date}</td>
                    <td>{item?.title}</td>
                    <td>{item?.created_by}</td>
                    <td>
                      <div className="table-action-icons">
                        {item.attendance && (
                          <div className="action-button">
                            <button className="special-btn" onClick={() => goToDownloadDocument(item.attendance)}>Attendence</button>
                          </div>
                        )}
                        <div className="action-button">
                          <button className="criteria-btn" onClick={() => goToDownloadDocument(agenda?.filename)}>Agenda Index</button>
                        </div>
                        <div className="action-button">
                          <button className="seats-btn" onClick={() => goToDownloadDocument(workingPaper?.filename)}>Working Papers</button>
                        </div>
                        <div className="action-button">
                          <button className="entry-test-btn" onClick={() => goToDownloadDocument(minutes?.filename)}>Minutes</button>
                        </div>
                        <div className="action-button">
                          <button className="special-btn" onClick={() => goToDownloadDocument(notice?.filename)}>Notice</button>
                        </div>
                        <br />
                        {/* {item.attendance && (
                    <div className="action-button">
                      <button className="special-btn" onClick={() => goToDownloadDocument(item.attendance)}>View Attendance</button>
                    </div>
                    )} */}
                      </div>
                    </td>
                    <td>

                      <div className="table-action-icons">
                        {hasAccess(sitePermissions.editSenateMeeting) && (
                          <div className="action-icon" onClick={() => handleEditAttendance(item.id)}>
                            <AddTablSvg />
                          </div>
                        )}
                        {hasAccess(sitePermissions.deleteSenateMeeting) && (
                          <div className="action-icon" onClick={() => handleDelete(item.id)}>
                            <DeleteTableSvg />
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
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination {...pagination} onPageChange={onPageChange} />
          {editAttendance && <EditAttendance setOpen={setEditAttendence} />}
        </Fragment>
      </SenateMeetingListingSection>
    </SenateMeetingListingMain>
  );
};

export default SenateMeetingListing;
