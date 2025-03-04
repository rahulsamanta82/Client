import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "utils/helpers/common/http-methods";
import { AddBoardDTO } from "utils/helpers/models/organization/add-board.dto";
import { AddLinkSpecialization } from "utils/helpers/models/organization/add-link-specialization.dto";
import { AddPermissionDTO } from "utils/helpers/models/organization/add-permission.dto";
import { AddSubjectDTO } from "utils/helpers/models/organization/add-subject.dto";
import { AddSuperAdminDTO } from "utils/helpers/models/organization/add-super-admin.dto";

export const ORGANIZATION_APIS = {
  createOrganization: (body: any) => postRequest("/super/organizations", body),
  updateOrganization: (body: any, id: number) =>
    postRequest(`/super/organizations/update/${id}`, body),
  deleteOrganization: (id: number) =>
    deleteRequest(`/super/organizations/${id}`),
  getOrganizationById: (id: number) => getRequest(`/super/organizations/${id}`),
  getOrganizations: (params: any) => getRequest(`/super/organizations`, params),
  downloadOrganizationsPdfFile: () =>
    getRequest(`/super/organizations/download/pdf`),
  downloadOrganizationsExcelFile: () =>
    getRequest(`/super/organizations/download/excel`),
  createStructureTypeSuperAdmin: (body: any) =>
    postRequest("/super/categories_types", body),
  updateStructureTypeSuperAdmin: (
    body: any,
    structureTypeId: number,
    organizationId: number
  ) => putRequest(`/super/categories_types/${structureTypeId}`, body),
  deleteStructureTypeSuperAdmin: (
    structureTypeId: number,
    organizationId: number
  ) => deleteRequest(`/super/categories_types/${structureTypeId}`),
  getStructureTypeByIdSuperAdmin: (
    structureTypeId: number,
    organizationId: number
  ) => getRequest(`/super/categories_types/${structureTypeId}`),
  getStructureTypesSuperAdmin: (params: any) =>
    getRequest(`/super/categories_types`, params),
  createStructureTypeAdmin: (body: any) =>
    postRequest("/admin/categories_types", body),
  updateStructureTypeAdmin: (body: any, id: number) =>
    putRequest(`/admin/categories_types/${id}`, body),
  deleteStructureTypeAdmin: (id: number) =>
    deleteRequest(`/admin/categories_types/${id}`),
  getStructureTypeByIdAdmin: (id: number) =>
    getRequest(`/admin/categories_types/${id}`),
  getStructureTypesAdmin: (params: any) =>
    getRequest(`/admin/categories_types`, params),
  createOrgStructure: (body: any) => postRequest("/admin/categories", body),
  updateOrgStructure: (body: any, id: number) =>
    postRequest(`/admin/categories/update/${id}`, body),
  deleteOrgStructure: (id: number) => deleteRequest(`/admin/categories/${id}`),
  getOrgStructureById: (id: number) => getRequest(`/admin/categories/${id}`),
  getOrgStructures: (params: any) =>
    getRequest(`/admin/list/categories`, params),
  createProgram: (body: any) => postRequest("/admin/programs", body),
  updateProgram: (body: any, id: number) =>
    patchRequest(`/admin/programs/${id}`, body),
  deleteProgram: (id: number) => deleteRequest(`/admin/programs/${id}`),
  getPrograms: (params: any) => getRequest(`/admin/programs`, params),
  getProgramsForEntryTest: (params: any) =>
    getRequest(`/admin/programs/list/status`, params),
  getProgramById: (id: number) => getRequest(`/admin/programs/${id}`),
  downloadProgramsPdfFile: () => getRequest(`admin/programs/download/pdf`),
  downloadProgramsExcelFile: () => getRequest(`admin/programs/download/excel`),
  getCitiesSuperAdmin: (params: any) => getRequest(`/super/cities`, params),
  getDistrictsSuperAdmin: (params: any) =>
    getRequest(`/super/districts/list`, params),
  getStatesSuperAdmin: (params: any) =>
    getRequest(`/super/states/list`, params),
  getCitiesAdmin: (params: any) => getRequest(`/admin/cities`, params),
  getDistrictsAdmin: (params: any) =>
    getRequest(`/admin/districts/list`, params),
  getStatesAdmin: (params: any) => getRequest(`/super/states/list`, params),
  getCertificateLevels: (params: any) =>
    getRequest(`admin/certificatelevels`, params),
  getDepartmentsByStructureTypeId: (id: number) =>
    getRequest(`admin/departments/${id}`),
  downloadOrgStructuresExcelFile: () =>
    getRequest(`admin/categories/download/excel`),
  downloadOrgStructuresPdfFile: () =>
    getRequest(`admin/categories/download/pdf`),
  downloadStructureTypesExcelFileByAdmin: () =>
    getRequest(`admin/categories_types/download/excel`),
  downloadStructureTypesPdfFileByAdmin: () =>
    getRequest(`admin/categories_types/download/pdf`),
  downloadStructureTypesExcelFileBySuperAdmin: () =>
    getRequest(`super/categories_types/download/excel`),
  downloadStructureTypesPdfFileBySuperAdmin: () =>
    getRequest(`super/categories_types/download/pdf`),
  createResultTypeAdmin: (body: any) => postRequest(`admin/resulttypes`, body),
  updateResultTypeAdmin: (id: number, body: any) =>
    putRequest(`admin/resulttypes/${id}`, body),
  getResultTypesAdmin: (params: any) => getRequest(`admin/resulttypes`, params),
  getResultTypeByIdAdmin: (id: number) => getRequest(`admin/resulttypes/${id}`),
  deleteResultTypeAdmin: (id: number) =>
    deleteRequest(`admin/resulttypes/${id}`),
  createBoard: (body: AddBoardDTO) => postRequest(`admin/boards`, body),
  updateBoard: (id: number, body: AddBoardDTO) =>
    putRequest(`admin/boards/${id}`, body),
  getBoards: (params: any) => getRequest(`admin/boards`, params),
  getBoardById: (id: number) => getRequest(`admin/boards/${id}`),
  deleteBoard: (id: number) => deleteRequest(`admin/boards/${id}`),
  createSubject: (body: AddSubjectDTO) => postRequest(`admin/subjects`, body),
  updateSubject: (id: number, body: AddSubjectDTO) =>
    putRequest(`admin/subjects/${id}`, body),
  deleteSubject: (id: number) => deleteRequest(`admin/subjects/${id}`),
  getSubjectById: (id: number) => getRequest(`admin/subjects/${id}`),
  getSubjects: (params: any) => getRequest(`admin/subjects`, params),
  createDegreeCertificate: (body: any) =>
    postRequest(`admin/degreecertificates`, body),
  updateDegreeCertificate: (id: number, body: any) =>
    putRequest(`admin/degreecertificates/${id}`, body),
  getDegreeCertificates: (params: any) =>
    getRequest(`admin/degreecertificates`, params),
  getDegreeCertificateById: (id: number) =>
    getRequest(`admin/degreecertificates/${id}`),
  deleteDegreeCertificate: (id: number) =>
    deleteRequest(`admin/degreecertificates/${id}`),
  createLinkSpecialization: (body: AddLinkSpecialization) =>
    postRequest(`admin/linked_specializations`, body),
  updateLinkSpecialization: (id: number, body: AddLinkSpecialization) =>
    putRequest(`admin/linked_specializations/${id}`, body),
  getLinkSpecializations: (params: any) =>
    getRequest(`admin/linked_specializations`, params),
  deleteLinkSpecialization: (id: number) =>
    deleteRequest(`admin/linked_specializations/${id}`),
  getLinkSpecializationById: (id: number) =>
    getRequest(`admin/linked_specializations/${id}`),
  createEntryTestLink: (body: any) =>
    postRequest(`admin/entry_test_link_program`, body),
  updateEntryTestLink: (id: number, body: any) =>
    putRequest(`admin/entry_test_link_program/${id}`, body),
  getEntryTestLinks: (params: any) =>
    getRequest(`admin/entry_test_link_program`, params),
  getEntryTestLinkById: (id: number) =>
    getRequest(`admin/entry_test_link_program/${id}`),
  deleteEntryTestLink: (id: number) =>
    deleteRequest(`admin/entry_test_link_program/${id}`),
  createPermission: (body: AddPermissionDTO) =>
    postRequest(`super/permissions`, body),
  deletePermission: (id: number) => deleteRequest(`super/permissions/${id}`),
  getPermissions: (params: any) => getRequest(`super/permissions`, params),
  getPermissionsByAdmin: (params: any) =>
    getRequest(`admin/roles/permissions/list`, params),
  createCertificateLink: (body: any) =>
    postRequest(`admin/certificate_link_result_type`, body),
  updateCertificateLink: (id: number, body: any) =>
    putRequest(`admin/certificate_link_result_type/${id}`, body),
  getCertificateLinks: (params: any) =>
    getRequest(`admin/certificate_link_result_type`, params),
  getCertificateLinkById: (id: number) =>
    getRequest(`admin/certificate_link_result_type/${id}`),
  deleteCertificateLink: (id: number) =>
    deleteRequest(`admin/certificate_link_result_type/${id}`),
  createRoleBySuperAdmin: (body: any) => postRequest(`super/roles`, body),
  updateRoleBySuperAdmin: (id: number, body: any) =>
    putRequest(`super/roles/${id}`, body),
  getRolesBySuperAdmin: (params: any) => getRequest(`super/roles`, params),
  getRoleByIdBySuperAdmin: (id: number) => getRequest(`super/roles/${id}`),
  deleteRoleBySuperAdmin: (id: number) => deleteRequest(`super/roles/${id}`),
  createRoleByAdmin: (body: any) => postRequest(`admin/roles`, body),
  updateRoleByAdmin: (id: number, body: any) =>
    putRequest(`admin/roles/${id}`, body),
  getRolesByAdmin: (params: any) => getRequest(`admin/roles`, params),
  getRoleByIdByAdmin: (id: number) => getRequest(`admin/roles/${id}`),
  deleteRoleByAdmin: (id: number) => deleteRequest(`admin/roles/${id}`),
  createSuperAdmin: (body: AddSuperAdminDTO) =>
    postRequest(`super/super_admins`, body),
  updateSuperAdmin: (id: number, body: AddSuperAdminDTO) =>
    putRequest(`super/super_admins/${id}`, body),
  getSuperAdmins: (params: any) => getRequest(`super/super_admins`, params),
  getSuperAdminById: (id: number) => getRequest(`super/super_admins/${id}`),
  deleteSuperAdmin: (id: number) => deleteRequest(`super/super_admins/${id}`),
  createBuilding: (body: any) => postRequest(`admin/buildings`, body),
  updateBuilding: (id: number, body: any) =>
    putRequest(`admin/buildings/${id}`, body),
  getBuildings: (params: any) => getRequest(`admin/buildings`, params),
  getBuildingById: (id: number) => getRequest(`admin/buildings/${id}`),
  deleteBuilding: (id: number) => deleteRequest(`admin/buildings/${id}`),
  getBuildingRoomType: (params: any) => getRequest(`admin/room_types`, {}),
  getCurrentOrganization: () => getRequest(`get/current/organization`),
  getCountriesAdmin: (params: any) => getRequest(`admin/countries/list`, params),
};
