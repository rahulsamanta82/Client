import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "utils/helpers/common/http-methods";
import { AddAdmissionApplicationDTO } from "utils/helpers/models/e-portal/add-admission-application.dto";
import { EmployementInfoDTO } from "utils/helpers/models/e-portal/employement-info.dto";
import { JobApplicationDTO } from "utils/helpers/models/e-portal/job-application.dto";
import { PublicationInfoDTO } from "utils/helpers/models/e-portal/publication-info.dto";
import { ReferenceInfoDTO } from "utils/helpers/models/e-portal/reference-info.dto";

export const USER_APIS = {
  getProfile: () => getRequest("user/profile"),
  getCitiesByUser: (params: any) => getRequest("/cities/list", params),
  updateUserPersonalInfo: (body: any) =>
    postRequest("user/update/personal-info", body),
  updateUserGuradianInfo: (body: any) =>
    postRequest("user/update/guardian-info", body),
  updateUserAdditionalInfo: (body: any) =>
    postRequest("user/update/additional-info", body),
  createEntryTest: (body: any) => postRequest("user/create/entryTest", body),
  updateEntryTest: (id: number, body: any) =>
    postRequest(`user/update/entryTest/${id}`, body),
  getEntryTestsByUser: (params: any) =>
    getRequest(`user/list/entryTest`, params),
  createQualification: (body: any) =>
    postRequest("user/create/qualification", body),
  updateQualification: (id: number, body: any) =>
    postRequest(`user/update/qualification/${id}`, body),
  getQualificationsByUser: (params: any) =>
    getRequest(`user/qualifications/list`, params),
  getBoardsByUser: (id: string) => getRequest(`user/boards/list/${id}`),
  getCertificateLevelsByUser: (params: any) =>
    getRequest(`user/certificatelevels/list`, params),
  getDegreeCertificatesByUser: (id: string) =>
    getRequest(`user/degreecertificates/list/${id}`),
  getResultTypesByUser: (params: any) =>
    getRequest(`user/resulttypes/list`, params),
  getEntryTestByUserById: (params: any) =>
    getRequest(`user/resulttypes/list`, params),
  getQualificationByUserById: (params: any) =>
    getRequest(`user/resulttypes/list`, params),
  deleteQualificationByUser: (id: number) =>
    deleteRequest(`user/delete/qualification/${id}`),
  downloadQualificationDocumentByUser: (id: number) =>
    getRequest(`user/download/qualification/document/${id}`),
  deleteEntryTestByUser: (id: number) =>
    deleteRequest(`user/delete/entryTest/${id}`),
  getEntryTestTypesByUser: (params: any) =>
    getRequest(`user/admentrytests/list`, params),
  getStudentsApplications: (params: any) =>
    getRequest(`user/applications/list`, params),
  getStudentProgramsToApply: (params: any) =>
    getRequest(`user/admission/programs/list`, params),
  getStudentCertificateLevels: (params: any) =>
    getRequest(`user/certificatelevels/list`, params),
  getStudentDegreeCertificates: (id: number) =>
    getRequest(`user/degreecertificates/list/${id}`),
  getStudentBoards: (id: number) => getRequest(`user/boards/list/${id}`),
  getSubjectsByUser: (params: any) => getRequest(`user/subjects/list`, params),
  getAdmissionPrograms: (params: any) => getRequest(`user/admission/programs/list`, params),
  submitAdmissionApplication: (body: AddAdmissionApplicationDTO) =>
    postRequest(`user/admissions/create`, body),
  getStudentApplications: (params: any) => getRequest(`user/applications/list`),
  getCampusApplications: () => getRequest(`user/campuses`),
  createEmployementInfo: (body: EmployementInfoDTO) => postRequest(`user/employment_info`, body),
  updateEmployementInfo: (id: number, body: any) => postRequest(`user/employment/info/update/${id}`, body),
  getEmployementInfos: (params: any) => getRequest(`user/employment_info`, params),
  getEmployementInfoById: (id: number) => getRequest(`user/employment_info/${id}`),
  deleteEmployementInfo: (id: number) => deleteRequest(`user/employment_info/${id}`),
  createPublicationInfo: (body: PublicationInfoDTO) => postRequest(`user/candidate_publications`, body),
  updatePublicationInfo: (id: number, body: any) => postRequest(`user/candidate/publication/update/${id}`, body),
  getPublicationInfos: (params: any) => getRequest(`user/candidate_publications`, params),
  getPublicationInfoById: (id: number) => getRequest(`user/candidate_publications/${id}`),
  deletePublicationInfo: (id: number) => deleteRequest(`user/candidate_publications/${id}`),
  createReferenceInfo: (body: ReferenceInfoDTO) => postRequest(`user/candidate_references`, body),
  updateReferenceInfo: (id: number, body: ReferenceInfoDTO) => putRequest(`user/candidate_references/${id}`, body),
  getReferenceInfos: (params: any) => getRequest(`user/candidate_references`, params),
  getReferenceInfoById: (id: number) => getRequest(`user/candidate_references/${id}`),
  deleteReferenceInfo: (id: number) => deleteRequest(`user/candidate_references/${id}`),
  createJobApplication: (body: JobApplicationDTO) => postRequest(`user/applied/jobs`, body),
  updateJobApplication: (id: number, body: JobApplicationDTO) => putRequest(`user/applied/jobs/${id}`, body),
  getJobApplications: (params: any) => getRequest(`user/applied/jobs`, params),
  getJobApplicationById: (id: number) => getRequest(`user/applied/jobs/${id}`),
  deleteJobApplication: (id: number) => deleteRequest(`user/applied/jobs/${id}`),
  getJobDesignations: (params: any) => getRequest(`user/designations`, params),
  checkJobEligibility: (body: any) => postRequest(`user/job/applications/get_job_popup`, body),
  getJobTypesByUser: (params: any) => getRequest(`user/jobtype`, params),
  getJobsToApply: (params: any) => getRequest(`user/job/list`, params)
};
