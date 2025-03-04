import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "utils/helpers/common/http-methods";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";

export const CAREERS_API = {
  createJobDesignation: (body: JobDesignationDTO) =>
    postRequest(`admin/designations`, body),
  updateJobDesignation: (id: number, body: JobDesignationDTO) =>
    putRequest(`admin/designations/${id}`, body),
  getJobDesignations: (params: any) => getRequest(`admin/designations`, params),
  getJobDesignationById: (id: number) => getRequest(`admin/designations/${id}`),
  deleteJobDesignationById: (id: number) =>
    deleteRequest(`admin/designations/${id}`),
  createJobBatch: (body: JobDesignationDTO) =>
    postRequest(`admin/jobbatch`, body),
  updateJobBatch: (id: number, body: JobDesignationDTO) =>
    putRequest(`admin/jobbatch/${id}`, body),
  getJobBatches: (params: any) => getRequest(`admin/jobbatch`, params),
  getJobBatchById: (id: number) => getRequest(`admin/jobbatch/${id}`),
  deleteJobBatch: (id: number) => deleteRequest(`admin/jobbatch/${id}`),
  createJobType: (body: JobDesignationDTO) =>
    postRequest(`admin/jobtype`, body),
  updateJobType: (id: number, body: JobDesignationDTO) =>
    putRequest(`admin/jobtype/${id}`, body),
  getJobTypes: (params: any) => getRequest(`admin/jobtype`, params),
  getJobTypeById: (id: number) => getRequest(`admin/jobtype/${id}`),
  deleteJobType: (id: number) => deleteRequest(`admin/jobtype/${id}`),
  createJobTemplate: (body: JobDesignationDTO) =>
    postRequest(`admin/jobtemplate`, body),
  updateJobTemplate: (id: number, body: JobDesignationDTO) =>
    putRequest(`admin/jobtemplate/${id}`, body),
  getJobTemplates: (params: any) => getRequest(`admin/jobtemplate`, params),
  getJobTemplateById: (id: number) => getRequest(`admin/jobtemplate/${id}`),
  deleteJobTemplate: (id: number) => deleteRequest(`admin/jobtemplate/${id}`),
  createJobPost: (body: JobDesignationDTO) =>
    postRequest(`admin/jobpost`, body),
  updateJobPost: (id: number, body: JobDesignationDTO) =>
    putRequest(`admin/jobpost/${id}`, body),
  getJobPosts: (params: any) => getRequest(`admin/jobpost`, params),
  getJobPostById: (id: number) => getRequest(`admin/jobpost/${id}`),
  deleteJobPost: (id: number) => deleteRequest(`admin/jobpost/${id}`),
  getCareerApplications: (params: any) =>
    getRequest(`admin/job/applications/list`, params),
};
