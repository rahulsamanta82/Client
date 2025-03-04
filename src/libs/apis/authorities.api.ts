import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "utils/helpers/common/http-methods";
import { AuthorityTypesDTO } from "utils/helpers/models/authorities/authorities-types.dto";
import { AuthorityNotificationsDTO } from "utils/helpers/models/authorities/authority-notifications.dto";
import { AuthorityDTO } from "utils/helpers/models/authorities/authorities.dto";
import { AuthorityMeetingdDTO } from "utils/helpers/models/authorities/authority-meeting.dto";
import { AuthorityBoardDTO } from "utils/helpers/models/authorities/authority-board.dto";


export const AUTHORITIES_API = {
  createCommitteeType: (body: AuthorityTypesDTO) => postRequest(`admin/authority_types`, body),
  updateCommitteeType: (id: number, body: AuthorityTypesDTO) =>
    putRequest(`admin/authority_types/${id}`, body),
  getCommitteeTypes: (params: any) => getRequest(`admin/authority_types`, params),
  getCommitteeTypeById: (id: number) => getRequest(`admin/authority_types/${id}`),
  deleteCommitteeTypeById: (id: number) => deleteRequest(`admin/authority_types/${id}`),

  createAcademicNotification: (body: AuthorityNotificationsDTO) => postRequest(`admin/authority_notifications`, body),
  updateAcademicNotification: (id: number, body: any) => postRequest(`admin/authority_notifications/update/${id}`, body),
  getAcademicNotification: (params: any) => getRequest(`admin/authority_notifications`, params),
  getAcademicNotificationById: (id: number) => getRequest(`admin/authority_notifications/${id}`),
  deleteAcademicNotificationById: (id: number) => deleteRequest(`admin/authority_notifications/${id}`),

  createAuthority: (body: AuthorityDTO) => postRequest(`admin/authorities`, body),
  updateAuthority: (id: number, body: AuthorityDTO) => postRequest(`admin/authorities/update/${id}`, body),
  getAuthorities: (params: any) => getRequest(`admin/authorities`, params),
  getAuthorityById: (id: number) => getRequest(`admin/authorities/${id}`),
  deleteAuthorityById: (id: number) => deleteRequest(`admin/authorities/${id}`),
  createAuthorityBoard: (body: AuthorityBoardDTO) => postRequest(`admin/authority_boards`, body),
  updateAuthorityBoard: (id: number, body: AuthorityBoardDTO) => putRequest(`admin/authority_boards/${id}`, body),
  getAuthorityBoards: (params: any) => getRequest(`admin/authority_boards`, params),
  getAuthorityBoardById: (id: number) => getRequest(`admin/authority_boards/${id}`),
  deleteAuthorityBoard: (id: number) => deleteRequest(`admin/authority_boards/${id}`),
  uploadAuthorityDocument: (body: FormData) => postRequest(`admin/authorities/upload/document`, body),
  getAuthorityMeetings: (params: any) => getRequest(`admin/authority_meetings`, params),
  deleteAuthorityMeetingById: (id: number) => deleteRequest(`admin/authority_meetings/${id}`),
  createAuthorityMeeting: (body: AuthorityMeetingdDTO) => postRequest(`admin/authority_meetings`, body),
  updateAuthorityMeeting: (id: number, body: AuthorityMeetingdDTO) => postRequest(`admin/authority_meetings/update/${id}`, body),
  updateAuthorityMeetingAttendance: (id: number, body: AuthorityMeetingdDTO) => postRequest(`admin/authority_meetings/update/attendance/${id}`, body),
  uploadAuthorityMeetingDocument: (body: FormData) => postRequest(`admin/authority_meetings/upload/attachment`, body)
};
