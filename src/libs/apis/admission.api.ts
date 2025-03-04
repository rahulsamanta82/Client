import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "utils/helpers/common/http-methods";
import { AddAdmissionEntryTestDTO } from "utils/helpers/models/admissions/add-admission-entry-test.dto";
import { AddAdmissionSessionDTO } from "utils/helpers/models/admissions/add-admission-session.dto";
import { AddMeritFormulaDTO } from "utils/helpers/models/admissions/add-merit-formula.dto";
import { AddMeritKeyDTO } from "utils/helpers/models/admissions/add-merit-key.dto";
import { AddQuotaHeaderDTO } from "utils/helpers/models/admissions/add-quota-header.dto";
import { AddQuotaProgramLinkDTO } from "utils/helpers/models/admissions/add-quota-program-link.dto";
import { AddSubjectLinkToCertificateDTO } from "utils/helpers/models/admissions/add-subject-link-to-certificate.dto";
import { AddTemplateLinkToProgramDTO } from "utils/helpers/models/admissions/add-template-link-to-program.dto";
import { CreateEligibilityTemplateBodyDTO } from "utils/helpers/models/admissions/create-eligibility-template-body.dto";
import { UpdateLinkedProgramDTO } from "utils/helpers/models/admissions/update-linked-program.dto";

export const ADMISSION_APIS = {
  createTemplateHeader: (body: any) =>
    postRequest(`admin/adm_eligibility_template_header`, body),
  getTemplateHeaders: (params?: any) =>
    getRequest(`admin/adm_eligibility_template_header`, params),
  updateTemplateHeader: (id: number, body: any) =>
    putRequest(`admin/adm_eligibility_template_header/${id}`, body),
  getTemplateHeaderById: (id: number) =>
    getRequest(`admin/adm_eligibility_template_header/${id}`),
  deleteTemplateHeader: (id: number) =>
    deleteRequest(`admin/adm_eligibility_template_header/${id}`),
  createTemplateBody: (body: CreateEligibilityTemplateBodyDTO) =>
    postRequest(`admin/adm_eligibility_template_body`, body),
  getTemplateBodies: (headerId: number, params: any) =>
    getRequest(
      `admin/adm_eligibility_template_body/header/${headerId}`,
      params
    ),
  updateTemplateBody: (id: number, body: any) =>
    putRequest(`admin/adm_eligibility_template_body/${id}`, body),
  getTemplateBodyById: (id: number) =>
    getRequest(`admin/adm_eligibility_template_body/${id}`),
  deleteTemplateBody: (id: number) =>
    deleteRequest(`admin/adm_eligibility_template_body/${id}`),
  createAdmissionQuota: (body: any) => postRequest(`admin/adm_quotas`, body),
  updateAdmissionQuota: (id: number, body: any) =>
    putRequest(`admin/adm_quotas/${id}`, body),
  getAdmissionQuotas: (params: any) => getRequest(`admin/adm_quotas`, params),
  getAdmissionQuotaById: (id: number) => getRequest(`admin/adm_quotas/${id}`),
  deleteAdmissionQuota: (id: number) => deleteRequest(`admin/adm_quotas/${id}`),
  createAdmissionSession: (body: AddAdmissionSessionDTO) =>
    postRequest(`/admin/sessions`, body),
  updateAdmissionSession: (id: number, body: AddAdmissionSessionDTO) =>
    putRequest(`/admin/sessions/${id}`, body),
  getAdmissionSessions: (params: any) => getRequest(`admin/sessions`, params),
  getAdmissionSessionById: (id: number) => getRequest(`/admin/sessions/${id}`),
  deleteAdmissionSession: (id: number) =>
    deleteRequest(`/admin/sessions/${id}`),
  createAdmissionEntryTests: (body: AddAdmissionEntryTestDTO) =>
    postRequest(`admin/admentrytests`, body),
  updateAdmissionEntryTest: (id: number, body: AddAdmissionEntryTestDTO) =>
    putRequest(`admin/admentrytests/${id}`, body),
  getAdmissionEntryTests: (params: any) =>
    getRequest(`admin/admentrytests`, params),
  getAdmissionEntryTestById: (id: number) =>
    getRequest(`admin/admentrytests/${id}`),
  deleteAdmissionEntryTest: (id: number) =>
    deleteRequest(`admin/admentrytests/${id}`),
  createAdmissionCampaign: (body: any) =>
    postRequest(`admin/admission_sessions`, body),
  updateAdmissionCampaign: (id: number, body: any) =>
    putRequest(`admin/admission_sessions/${id}`, body),
  getAdmissionCampaigns: (params: any) =>
    getRequest(`admin/admission_sessions`, params),
  getAdmissionCampaignById: (id: number) =>
    getRequest(`admin/admission_sessions/${id}`),
  deleteAdmissionCampaign: (id: number) =>
    deleteRequest(`admin/admission_sessions/${id}`),
  getProgramsBySessionId: (sessionId: number, params: any) =>
    getRequest(`admin/admission_sessions/programs/${sessionId}`, params),
  updateLinkedProgramsBySessionId: (body: any) =>
    postRequest(`admin/admission_sessions/update/admission-programs`, body),
  createMeritKey: (body: AddMeritKeyDTO) =>
    postRequest(`admin/adm_merit_keys`, body),
  getMeritKeys: (params: any) => getRequest(`admin/adm_merit_keys`, params),
  getMeritKeyById: (id: number) => getRequest(`admin/adm_merit_keys/${id}`),
  deleteMeritKey: (id: number) => deleteRequest(`admin/adm_merit_keys/${id}`),
  updateMeritKey: (id: number, body: AddMeritKeyDTO) =>
    putRequest(`admin/adm_merit_keys/${id}`, body),
  createMeritFormula: (body: AddMeritFormulaDTO) =>
    postRequest(`admin/adm_program_merit`, body),
  updateMeritFormula: (id: number, body: AddMeritFormulaDTO) =>
    putRequest(`admin/adm_program_merit/${id}`, body),
  getMeritFormulas: (params: any) =>
    getRequest(`admin/adm_program_merit`, params),
  getMeritFormulaById: (id: number) =>
    getRequest(`admin/adm_program_merit/${id}`),
  deleteMeritFormula: (id: number) =>
    deleteRequest(`admin/adm_program_merit/${id}`),

  getEligibilityFieldData: (id: number) =>
    getRequest(`admin/adm_eligibility_tables_data/${id}`),

  createTemplateLinkToProgram: (body: AddTemplateLinkToProgramDTO) =>
    postRequest(`admin/program_link_template`, body),
  getProgramLinkTemplate: (params: any) =>
    getRequest(`admin/program_link_template`, params),
  createQuotaHeader: (body: AddQuotaHeaderDTO) =>
    postRequest(`admin/adm_program_quota_header`, body),
  updateQuotaHeader: (id: number, body: AddQuotaHeaderDTO) =>
    putRequest(`admin/adm_program_quota_header/${id}`, body),
  getQuotaHeaders: (params: any) =>
    getRequest(`admin/adm_program_quota_header`, params),
  getQuotaHeaderById: (id: number) =>
    getRequest(`admin/adm_program_quota_header/${id}`),
  deleteQuotaHeader: (id: number) =>
    deleteRequest(`admin/adm_program_quota_header/${id}`),
  createQuotaProgramLink: (body: AddQuotaProgramLinkDTO) =>
    postRequest(`admin/adm_program_quota`, body),
  updateQuotaProgramLink: (id: number, body: AddQuotaProgramLinkDTO) =>
    putRequest(`admin/adm_program_quota/${id}`, body),
  getQuotaProgramLinks: (params: any) =>
    getRequest(`admin/adm_program_quota`, params),
  getQuotaProgramLinkById: (id: number) =>
    getRequest(`admin/adm_program_quota/${id}`),
  deleteQuotaProgramLink: (id: number) =>
    deleteRequest(`admin/adm_program_quota/${id}`),
  createLinkSubjectToCertificate: (body: AddSubjectLinkToCertificateDTO) =>
    postRequest(`admin/certificates_link_subjects`, body),
  updateLinkSubjectToCertificate: (
    id: string,
    body: AddSubjectLinkToCertificateDTO
  ) => putRequest(`admin/certificates_link_subjects/${id}`, body),
  getLinkSubjectToCertificates: (params: any) =>
    getRequest(`admin/certificates_link_subjects`, params),
  getLinkSubjectToCertificateById: (id: number) =>
    getRequest(`admin/certificates_link_subjects/${id}`),
  deleteLinkSubjectToCertificate: (id: number) =>
    deleteRequest(`admin/adm_program_quota/${id}`),
  mergeTemplateBodies: (body: any) =>
    postRequest(`admin/templates_body_merge`, body),
  removeTemplateBodiesGroup: (params: any) =>
    getRequest(`admin/templates_body_group_remove`, params),
  deleteProgramLinkTemplate: (id: number) =>
    deleteRequest(`admin/program_link_template/${id}`),
  createMeritListAutomation: (body: any) =>
    postRequest(`admin/adm_meritlist_automation`, body),
  updateMeritListAutomation: (id: number, body: any) =>
    putRequest(`admin/adm_meritlist_automation/${id}`, body),
  getMeritListAutomations: (params: any) =>
    getRequest(`admin/adm_meritlist_automation`, params),
  getMeritListAutomationById: (id: number) =>
    getRequest(`admin/adm_meritlist_automation/${id}`),
  deleteMeritListAutomation: (id: number) =>
    deleteRequest(`admin/adm_meritlist_automation/${id}`),
  createProgramLinkMerit: (body: any) =>
    postRequest(`admin/program_link_merit`, body),
  updateProgramLinkMerit: (id: number, body: any) =>
    putRequest(`admin/program_link_merit/${id}`, body),
  getProgramLinkMerits: (params: any) =>
    getRequest(`admin/program_link_merit`, params),
  getProgramLinkMeritById: (id: number) =>
    getRequest(`admin/program_link_merit/${id}`),
  deleteProgramLinkMerit: (id: number) =>
    deleteRequest(`admin/program_link_merit/${id}`),
  updateLinkedProgram: (body: UpdateLinkedProgramDTO) =>
    postRequest(`admin/admission_sessions/update/admission-status`, body),
  getCampusList: () => getRequest(`admin/campuses`),
  getStudentApplicants: (params: any) =>
    getRequest(`admin/admission/applications`, params),
  getStudenApplicantsFilterData: () => getRequest(`admin/views-data/list`),
  getStudentApplicantFilterProgram: (params: any) =>
    getRequest(`admin/programs-data/list`, params),
  getQuotaPrograms: (params: any) =>
    getRequest(`admin/adm_program_quota/programs/list`, params),
  bulkLock: (automationId: number, params: any) =>
    getRequest(`admin/adm_bulk_lock/${automationId}`, params),
  bulkUnlock: (automationId: number, params: any) =>
    getRequest(`admin/adm_bulk_unlock/${automationId}`, params),
  downlodBulkList: (id: number) => getRequest(`admin/adm_bulk_download/${id}`),
  getMeritList: (params: any) =>
    getRequest(`admin/admission/merit_list`, params),
  editProgramLinkQuota: (id: number, body: any) =>
    putRequest(`admin/adm_program_quota/${id}`, body),
};
