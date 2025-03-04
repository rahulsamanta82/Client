import { domains } from "utils/helpers/enums/shared.enums";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

export const ROUTES_PERMISSIONS = [
  {
    path: siteRoutes.createOrganization,
    permission: sitePermissions.createOrganization,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.organizationListing,
    permission: sitePermissions.organizationListing,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.viewOrganization,
    permission: sitePermissions.viewOrganization,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.createAsset,
    permission: sitePermissions.createAsset,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.assetsListing,
    permission: sitePermissions.assetListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createBuilding,
    permission: sitePermissions.createBuilding,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.buildingListing,
    permission: sitePermissions.buildingListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createProgram,
    permission: sitePermissions.createProgram,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.programListing,
    permission: sitePermissions.programListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOrgStructure,
    permission: sitePermissions.createOrgStructure,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.orgStructureListing,
    permission: sitePermissions.orgStructureListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createStructureType,
    permission: sitePermissions.createStructureType,
    domains: [domains.mainDomain, domains.subDomain],
  },
  {
    path: siteRoutes.structureTypeListing,
    permission: sitePermissions.structureTypeListing,
    domains: [domains.mainDomain, domains.subDomain],
  },
  {
    path: siteRoutes.resultTypeListing,
    permission: sitePermissions.resultTypeListing,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.resultTypeCreate,
    permission: sitePermissions.resultTypeCreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.superAdminLogin,
    permission: sitePermissions.superAdminLogin,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.superAdminDashboard,
    permission: sitePermissions.superAdminDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.adminDashboard,
    permission: sitePermissions.adminDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.adminLogin,
    permission: sitePermissions.adminLogin,
    domains: [domains.subDomain],
  },
  //new routes
  {
    path: siteRoutes.createHostel,
    permission: sitePermissions.createHostel,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hostelListing,
    permission: sitePermissions.hostelListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hostelRoomsListing,
    permission: sitePermissions.hostelRoomsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createHostelRoom,
    permission: sitePermissions.createHostelRoom,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.applicantListing,
    permission: sitePermissions.applicantListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createApplicant,
    permission: sitePermissions.createApplicant,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hostelMeritListing,
    permission: sitePermissions.hostelMeritListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createHostelMerit,
    permission: sitePermissions.createHostelMerit,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hostelSessionListing,
    permission: sitePermissions.hostelSessionListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createHostelSession,
    permission: sitePermissions.createHostelSession,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hostelFinanceManagement,
    permission: sitePermissions.hostelFinanceManagement,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.appliedApplicant,
    permission: sitePermissions.appliedApplicant,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.applicantEnrollment,
    permission: sitePermissions.applicantEnrollment,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.registeredApplicant,
    permission: sitePermissions.registeredApplicantList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hostelApplicantMeritList,
    permission: sitePermissions.hostelApplicantMeritList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalLogin,
    permission: sitePermissions.ePortalDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalRegister,
    permission: sitePermissions.ePortalDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalResetPassword,
    permission: sitePermissions.ePortalDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalDashboard,
    permission: sitePermissions.ePortalDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalChallanListing,
    permission: sitePermissions.ePortalChallanListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalShortCoursesListing,
    permission: sitePermissions.ePortalShortCoursesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalShortCoursesListing,
    permission: sitePermissions.ePortalShortCoursesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.ePortalEditProfile,
    permission: sitePermissions.ePortalEditProfile,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eportalHostelPortal,
    permission: sitePermissions.eportalHostelPortal,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eportalAdmissionsListing,
    permission: sitePermissions.eportalAdmissionsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSessionListing,
    permission: sitePermissions.academicSessionListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionSession,
    permission: sitePermissions.createAdmissionSession,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.viewEportalProfile,
    permission: sitePermissions.viewEportalProfile,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionSessionListing,
    permission: sitePermissions.admissionSessionListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionCampaign,
    permission: sitePermissions.createAdmissionCampaign,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionCampaignListing,
    permission: sitePermissions.admissionCampaignListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionStudentListing,
    permission: sitePermissions.admissionStudentListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionApplicantsListing,
    permission: sitePermissions.admissionApplicantsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.editAdmissionDocument,
    permission: sitePermissions.editAdmissionDocument,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionDocumentListing,
    permission: sitePermissions.admissionDocumentListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionTestTypesListing,
    permission: sitePermissions.admissionTestTypesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionTestType,
    permission: sitePermissions.createAdmissionTestType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.studentRegListing,
    permission: sitePermissions.studentRegListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionMeritListing,
    permission: sitePermissions.admissionMeritListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionOfferLetterListing,
    permission: sitePermissions.admissionOfferLetterListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionMeritListing,
    permission: sitePermissions.admissionMeritListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionOfferLetterListing,
    permission: sitePermissions.admissionOfferLetterListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionOfferLetter,
    permission: sitePermissions.createAdmissionOfferLetter,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.editAdmissionBoard,
    permission: sitePermissions.editAdmissionBoard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.editAdmissionCertificate,
    permission: sitePermissions.editAdmissionCertificate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionManageDocumentsMasterListing,
    permission: sitePermissions.admissionManageDocumentsMasterListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissioneligibilityTemplateHeadersListing,
    permission: sitePermissions.admissioneligibilityTemplateHeadersListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissioneligibilityTemplateHeaders,
    permission: sitePermissions.createAdmissioneligibilityTemplateHeaders,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissioneligibilityTemplateBodiesListing,
    permission: sitePermissions.admissioneligibilityTemplateBodiesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissioneligibilityTemplateBody,
    permission: sitePermissions.createAdmissioneligibilityTemplateBody,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionQuotasListing,
    permission: sitePermissions.admissionQuotasListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionQuotas,
    permission: sitePermissions.createAdmissionQuotas,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.certificateLinkListing,
    permission: sitePermissions.certificateLinkListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.certificateLinkCreate,
    permission: sitePermissions.certificateLinkCreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.rollManagementCreate,
    permission: sitePermissions.rollManagementCreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.roleManagementListing,
    permission: sitePermissions.roleManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.boardManagementListing,
    permission: sitePermissions.boardManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.boardManagementCreate,
    permission: sitePermissions.boardManagementCreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.subjectManagementListing,
    permission: sitePermissions.subjectManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.subjectManagementCreate,
    permission: sitePermissions.subjectManagementCreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.certificateManagementListing,
    permission: sitePermissions.certificateManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.certificateManagementCreate,
    permission: sitePermissions.certificateManagementCreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.superAdminManagementListing,
    permission: sitePermissions.superAdminManagementListing,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.superAdminManagementCreate,
    permission: sitePermissions.superAdminManagementCreate,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.superRoleManagementListing,
    permission: sitePermissions.superRoleManagementListing,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.superRoleManagementCreate,
    permission: sitePermissions.superRoleManagementCreate,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.permissionManagementListing,
    permission: sitePermissions.permissionManagementListing,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.permissionManagementCreate,
    permission: sitePermissions.permissionManagementCreate,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.moduleManagement,
    permission: sitePermissions.moduleManagement,
    domains: [domains.mainDomain],
  },
  {
    path: siteRoutes.linkedSpecializationListing,
    permission: sitePermissions.linkedSpecializationListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLinkedSpecialization,
    permission: sitePermissions.createLinkedSpecialization,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.linkedProgramEntryTestListing,
    permission: sitePermissions.linkedProgramEntryTestListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLinkedProgramEntryTest,
    permission: sitePermissions.createLinkedProgramEntryTest,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSessionOrganizationListing,
    permission: sitePermissions.academicSessionOrganizationListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicSessionOrganization,
    permission: sitePermissions.createAcademicSessionOrganization,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionProgramListing,
    permission: sitePermissions.admissionProgramListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionSubjectManagementListing,
    permission: sitePermissions.admissionSubjectManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionSubjectManagement,
    permission: sitePermissions.createAdmissionSubjectManagement,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionBoardManagementListing,
    permission: sitePermissions.admissionBoardManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionBoardManagement,
    permission: sitePermissions.createAdmissionBoardManagement,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.admissionCertificatemanagementListing,
    permission: sitePermissions.admissionCertificateManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionCertificateManagement,
    permission: sitePermissions.createAdmissionCertificateManagement,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.meritKeysListing,
    permission: sitePermissions.meritKeysListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createMeritKeys,
    permission: sitePermissions.createMeitKeys,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.meritListFormulaListing,
    permission: sitePermissions.meritListFormulaListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createMeritListFormula,
    permission: sitePermissions.createMeritListFormula,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.majorCategoriesListing,
    permission: sitePermissions.majorCategoriesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.CreateMajorCategories,
    permission: sitePermissions.CreateMajorCategories,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.minorCategoriesListing,
    permission: sitePermissions.minorCategoriesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createMinorCategories,
    permission: sitePermissions.createMinorCategories,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.roomsListing,
    permission: sitePermissions.roomsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createRooms,
    permission: sitePermissions.createRooms,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.forgetPassword,
    permission: sitePermissions.forgetPassword,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.codeVerification,
    permission: sitePermissions.codeVerification,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createEportalAdmissionList,
    permission: sitePermissions.createEportalAdmissionList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.quotasAdmissionListing,
    permission: sitePermissions.quotasAdmissionListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createQuotasAdmissionList,
    permission: sitePermissions.createQuotasAdmissionList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.manageMeritListListing,
    permission: sitePermissions.manageMeritListListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdmissionManageMeritList,
    permission: sitePermissions.createAdmissionManageMeritList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.qoutasListProgramListing,
    permission: sitePermissions.qoutasListProgramListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eligibilityTemplatesListing,
    permission: sitePermissions.eligibilityTemplatesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eligibilityTemplatesCreate,
    permission: sitePermissions.eligibilityTemplatesCreate,
    domains: [domains.subDomain],
  },
  // {
  //   path: siteRoutes.linkedProgramAdmissionListing,
  //   permission: sitePermissions.linkedProgramAdmissionListing,
  //   domains: [domains.subDomain],
  // },
  {
    path: siteRoutes.programLinkMeritList,
    permission: sitePermissions.programLinkMeritList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createProgramLinkMeritList,
    permission: sitePermissions.createProgramLinkMeritList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.financeDashboard,
    permission: sitePermissions.financeDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.systemLogsListing,
    permission: sitePermissions.systemLogsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.systemUsersListing,
    permission: sitePermissions.systemUsersListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createSystemUsers,
    permission: sitePermissions.createSystemUsers,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.systemMenusListing,
    permission: sitePermissions.systemMenusListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createSystemMenus,
    permission: sitePermissions.createSystemMenus,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.unregisteredMenusListing,
    permission: sitePermissions.unregisteredMenusListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.userAuditListing,
    permission: sitePermissions.userAuditListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.workflowListing,
    permission: sitePermissions.workflowListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createWorkflow,
    permission: sitePermissions.createWorkflow,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createBank,
    permission: sitePermissions.createBank,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.banksListing,
    permission: sitePermissions.banksListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.bankTransactionLogsListing,
    permission: sitePermissions.bankTransactionLogsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.bankScrollLogsListing,
    permission: sitePermissions.bankScrollLogsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createVoucherParticular,
    permission: sitePermissions.createVoucherParticular,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.voucherParticularListing,
    permission: sitePermissions.voucherParticularListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eportalCareersListing,
    permission: sitePermissions.eportalCareersListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createEportalCareer,
    permission: sitePermissions.createEportalCareer,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createVoucherType,
    permission: sitePermissions.createVoucherType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.voucherTypesListing,
    permission: sitePermissions.voucherTypesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createVoucherTemplateHeader,
    permission: sitePermissions.createVoucherTemplateHeader,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.voucherTemplateHeaderListing,
    permission: sitePermissions.voucherTemplateHeaderListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createFinanceApplications,
    permission: sitePermissions.createFinanceApplications,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.financeApplicationsListing,
    permission: sitePermissions.financeApplicationsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createApplicationTemplateLink,
    permission: sitePermissions.createApplicationTemplateLink,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.applicationTemplateLinkListing,
    permission: sitePermissions.applicationTemplateLinkListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.studentFinancialClearanceListing,
    permission: sitePermissions.studentFinancialClearanceListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.checkFinancialChallanStatus,
    permission: sitePermissions.checkFinancialChallanStatus,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.templateProgramAccountCodeListing,
    permission: sitePermissions.templateProgramAccountCodeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createFineSlot,
    permission: sitePermissions.createFineSlot,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.fineSlotsListing,
    permission: sitePermissions.fineSlotsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.masterBookListing,
    permission: sitePermissions.masterBookListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.masterBookTransactionDetail,
    permission: sitePermissions.masterBookTransactionDetail,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.showMasterBookTransactionDetail,
    permission: sitePermissions.showMasterBookTransactionDetail,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eportalAppliedJobListing,
    permission: sitePermissions.eportalAppliedJobListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.eportalCarrerProfile,
    permission: sitePermissions.eportalCarrerProfile,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.careerDesignationListing,
    permission: sitePermissions.careerDesignationListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCareerDesignation,
    permission: sitePermissions.createCareerDesignation,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.careerAdvertisementListing,
    permission: sitePermissions.careerAdvertisementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCareerAdvertisement,
    permission: sitePermissions.createCareerAdvertisement,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.careerPostTemplateListing,
    permission: sitePermissions.careerPostTemplateListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCareerPostTemplate,
    permission: sitePermissions.createCareerPostTemplate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.careerPostListing,
    permission: sitePermissions.careerPostListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCareerPost,
    permission: sitePermissions.createCareerPost,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.careerApplicantListing,
    permission: sitePermissions.careerApplicantListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.voucherTemplateBodiesListing,
    permission: sitePermissions.voucherTemplateBodiesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.financeInstallmentListing,
    permission: sitePermissions.financeInstallmentListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createFinanceInstallment,
    permission: sitePermissions.createFinanceInstallment,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.installmentSlotListing,
    permission: sitePermissions.installmentSlotListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createInstallmentSlot,
    permission: sitePermissions.createInstallmentSlot,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.slotsInstallmentParticulars,
    permission: sitePermissions.slotsInstallmentParticulars,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.certificateLevelList,
    permission: sitePermissions.CertificateLevelList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCertificateLevels,
    permission: sitePermissions.createCertificateLevels,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicesDashboard,
    permission: sitePermissions.testingServicesDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.authoritiesListing,
    permission: sitePermissions.authoritiesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAuthorities,
    permission: sitePermissions.createAuthorities,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.viewMembers,
    permission: sitePermissions.viewMembers,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.viewDocuments,
    permission: sitePermissions.viewDocuments,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.senateMeetingList,
    permission: sitePermissions.senateMeetingList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.councilNotificationsListing,
    permission: sitePermissions.councilNotificationsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCouncilNotifications,
    permission: sitePermissions.createCouncilNotifications,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.authorityMemberTypeListing,
    permission: sitePermissions.authorityMemberTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAuthorityMemberType,
    permission: sitePermissions.createAuthorityMemberType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.authorityTypeListing,
    permission: sitePermissions.authorityTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAuthorityType,
    permission: sitePermissions.createAuthorityType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createSenateMeeting,
    permission: sitePermissions.createSenateMeeting,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicesDashboard,
    permission: sitePermissions.testingServicesDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testTypesListing,
    permission: sitePermissions.admissionTestTypesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createTestType,
    permission: sitePermissions.createAdmissionTestType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.TestingServicesTestCenterlist,
    permission: sitePermissions.TestingServicesTestCenterlist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.TestingServicesTestCentercreate,
    permission: sitePermissions.TestingServicesTestCentercreate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.TestingServicesTestSchedulelist,
    permission: sitePermissions.TestingServicesTestSchedulelist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createTestingServicesTestSchedule,
    permission: sitePermissions.createTestingServicesTestSchedule,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicespublishresult,
    permission: sitePermissions.testingServicespublishresult,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicescandidateTestResultlist,
    permission: sitePermissions.testingServicescandidateTestResultlist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingCenterRooms,
    permission: sitePermissions.testingCenterRooms,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createTestingServicesTestCenterRooms,
    permission: sitePermissions.createTestingServicesTestCenterRooms,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicesTestScheduleSeatingPlanlist,
    permission: sitePermissions.testingServicesTestScheduleSeatingPlanlist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicesTestScheduleSeatingPlanRoomslist,
    permission: sitePermissions.testingServicesTestScheduleSeatingPlanRoomslist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.viewTestApplicants,
    permission: sitePermissions.viewTestApplicants,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.testingServicescandidatelisting,
    permission: sitePermissions.testingServicescandidatelisting,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.reportCategoriesList,
    permission: sitePermissions.reportCategoriesList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createreportCategories,
    permission: sitePermissions.createreportCategories,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.surveyListing,
    permission: sitePermissions.surveyListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.qecReportManagelist,
    permission: sitePermissions.qecReportManagelist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createQecReportManage,
    permission: sitePermissions.createQecReportManage,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.qecSurveyReportlist,
    permission: sitePermissions.qecSurveyReportlist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createQecSurveyReport,
    permission: sitePermissions.createQecSurveyReport,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.createSurvey,
    permission: sitePermissions.createSurvey,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.surveyTypeListing,
    permission: sitePermissions.surveyTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createSurveyType,
    permission: sitePermissions.createSurveyType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.questionListing,
    permission: sitePermissions.questionListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createQuestion,
    permission: sitePermissions.createQuestion,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.libraryLanguagelist,
    permission: sitePermissions.libraryLanguagelist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLibraryLanguage,
    permission: sitePermissions.createLibraryLanguage,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.libraryPublisherlist,
    permission: sitePermissions.libraryPublisherlist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLibraryPublisher,
    permission: sitePermissions.createLibraryPublisher,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.librarySellerlist,
    permission: sitePermissions.librarySellerlist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLibrarySeller,
    permission: sitePermissions.createLibrarySeller,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.libraryBillslist,
    permission: sitePermissions.libraryBillslist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLibraryBills,
    permission: sitePermissions.createLibraryBills,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.libraryBookslist,
    permission: sitePermissions.libraryBookslist,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLibraryBooks,
    permission: sitePermissions.createLibraryBooks,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.libraryAccessRegisterlist,
    permission: sitePermissions.libraryAccessRegisterlist,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.legalFrameworkList,
    permission: sitePermissions.legalFrameworkList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalFramework,
    permission: sitePermissions.createLegalFramework,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.legalOrganizationList,
    permission: sitePermissions.legalOrganizationList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalOrganization,
    permission: sitePermissions.createLegalOrganization,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.frameworkDocumentTypeList,
    permission: sitePermissions.frameworkDocumentTypeList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createFrameworkDocumentType,
    permission: sitePermissions.createFrameworkDocumentType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.billRequestList,
    permission: sitePermissions.billRequestList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createBillRequest,
    permission: sitePermissions.createBillRequest,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.legalCasesList,
    permission: sitePermissions.legalCasesList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalCases,
    permission: sitePermissions.createLegalCases,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.legalAdvisorListing,
    permission: sitePermissions.legalAdvisorListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalAdvisor,
    permission: sitePermissions.createLegalAdvertisor,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.legalCourtList,
    permission: sitePermissions.legalCourtList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalCourt,
    permission: sitePermissions.createLegalCourt,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.legalStatusList,
    permission: sitePermissions.legalStatusList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalStatus,
    permission: sitePermissions.createLegalStatus,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.legalMatterTypeListing,
    permission: sitePermissions.legalMatterTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLegalMatterType,
    permission: sitePermissions.createLegalMatterType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.advisorRatesListing,
    permission: sitePermissions.advisorRatesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAdvisorRates,
    permission: sitePermissions.createAdvisorRates,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicCourseListing,
    permission: sitePermissions.academicCourseListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicCourse,
    permission: sitePermissions.createAcademicCourse,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSessionManagementListing,
    permission: sitePermissions.academicSessionManagementListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicEnrollmentsListing,
    permission: sitePermissions.academicEnrollmentsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicCourseGroupListing,
    permission: sitePermissions.academicCourseGroupListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicCourseGroup,
    permission: sitePermissions.createAcademicCourseGroup,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCommonCoursesPools,
    permission: sitePermissions.createCommonCoursesPools,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.commonCoursesPoolsListing,
    permission: sitePermissions.createCommonCoursesPools,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.academicGradeBookListing,
    permission: sitePermissions.academicGradeBookListing,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.oricDashboard,
    permission: sitePermissions.oricDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.approvedReceiptAcknowledgedListing,
    permission: sitePermissions.approvedReceiptAcknowledgedListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.appRecAckViewAwardList,
    permission: sitePermissions.appRecAckViewAwardList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.poolTeachersListing,
    permission: sitePermissions.poolTeachersListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.enrollPoolTeacher,
    permission: sitePermissions.enrollPoolTeacher,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricEventTypesListing,
    permission: sitePermissions.oricEventTypesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricEventTypes,
    permission: sitePermissions.createOricEventTypes,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricConferenceListing,
    permission: sitePermissions.oricConferenceListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricConference,
    permission: sitePermissions.createOricConference,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricCallListing,
    permission: sitePermissions.oricCallListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricCalls,
    permission: sitePermissions.createOricCalls,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricCallCategoriesListing,
    permission: sitePermissions.oricCallCategoriesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricCallCategories,
    permission: sitePermissions.createOricCallCategories,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricCareerDevelopmentListing,
    permission: sitePermissions.oricCareerDevelopmentListing,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.keyPerformanceIndicatorYearListing,
    permission: sitePermissions.keyPerformanceIndicatorYearListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createKeyPerformanceIndicatorYear,
    permission: sitePermissions.createKeyPerformanceIndicatorYear,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.researchIncentivesListing,
    permission: sitePermissions.researchIncentivesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createResearchIncentives,
    permission: sitePermissions.createResearchIncentives,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.oricCommunityListing,
    permission: sitePermissions.oricCommunityListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricCommunity,
    permission: sitePermissions.createOricCommunity,
    domains: [domains.subDomain],
  },

  {
    path: siteRoutes.oricMouPartyListing,
    permission: sitePermissions.oricMouPartyListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricMouParty,
    permission: sitePermissions.createOricMouParty,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricMouListing,
    permission: sitePermissions.oricMouListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricMou,
    permission: sitePermissions.createOricMou,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricProjectDateListing,
    permission: sitePermissions.oricProjectDateListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricProjectDate,
    permission: sitePermissions.createOricProjectDate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricProjectlisting,
    permission: sitePermissions.oricProjectlisting,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricProject,
    permission: sitePermissions.createOricProject,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricResearchGrantApplicationslisting,
    permission: sitePermissions.oricResearchGrantApplicationslisting,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricResearchProjectListing,
    permission: sitePermissions.oricResearchProjectListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricResearchProject,
    permission: sitePermissions.createOricResearchProject,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricMajorSubjectsListing,
    permission: sitePermissions.oricMajorSubjectsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOricMajorSubjects,
    permission: sitePermissions.createOricMajorSubjects,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.oricKPIScore,
    permission: sitePermissions.oricKPIScore,
    domains: [domains.subDomain],
  },

  //academics

  {
    path: siteRoutes.consolidatedResultsListing,
    permission: sitePermissions.consolidatedResultsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.sectionCoursesListing,
    permission: sitePermissions.sectionCoursesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.submittedCoursesListing,
    permission: sitePermissions.submittedCoursesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createFinanceAcademicSession,
    permission: sitePermissions.createFinanceAcademicSession,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.financeAcademicSessionListing,
    permission: sitePermissions.financeAcademicSessionListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.financeSessionStudentsListing,
    permission: sitePermissions.financeSessionStudentsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicStudent,
    permission: sitePermissions.academicStudent,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicStudentFine,
    permission: sitePermissions.academicStudentFine,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicDefaulterStudent,
    permission: sitePermissions.academicDefaulterStudent,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicFeeTypeListing,
    permission: sitePermissions.academicFeeTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicFeeType,
    permission: sitePermissions.createAcademicFeeType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicFeePlansListing,
    permission: sitePermissions.academicFeePlansListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicFeePlan,
    permission: sitePermissions.createAcademicFeePlan,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicManageFeePlanListing,
    permission: sitePermissions.academicManageFeePlanListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicFeeTransactionsListing,
    permission: sitePermissions.academicFeeTransactionsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicFeeReceipt,
    permission: sitePermissions.createAcademicFeeReceipt,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicPaidVouchersListing,
    permission: sitePermissions.academicPaidVouchersListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicExamTypeListing,
    permission: sitePermissions.academicExamTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicExamType,
    permission: sitePermissions.createAcademicExamType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicExamsListing,
    permission: sitePermissions.academicExamsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicExam,
    permission: sitePermissions.createAcademicExam,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicInvigilatorsListing,
    permission: sitePermissions.academicInvigilatorsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicInvigilator,
    permission: sitePermissions.createAcademicInvigilator,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicAuthorityListing,
    permission: sitePermissions.academicAuthorityListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicAuthority,
    permission: sitePermissions.createAcademicAuthority,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicAuthorityUsersListing,
    permission: sitePermissions.academicAuthorityUsersListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicAuthorityUser,
    permission: sitePermissions.createAcademicAuthorityUser,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicGradeTemplatesListing,
    permission: sitePermissions.academicGradeTemplatesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicGradeTemplate,
    permission: sitePermissions.createAcademicGradeTemplate,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicAuthorityUser,
    permission: sitePermissions.createAcademicAuthorityUser,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicStudentClearence,
    permission: sitePermissions.academicStudentClearence,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.manageGradeTemplates,
    permission: sitePermissions.manageGradeTemplates,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicStatus,
    permission: sitePermissions.createAcademicStatus,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicStatusListing,
    permission: sitePermissions.academicStatusListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createClearanceAuthority,
    permission: sitePermissions.createClearanceAuthority,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.clearanceAuthoritiesListing,
    permission: sitePermissions.clearanceAuthoritiesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createStudentStatus,
    permission: sitePermissions.createStudentStatus,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.studentStatusListing,
    permission: sitePermissions.studentStatusListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createStudentGroup,
    permission: sitePermissions.createStudentGroup,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.studentGroupListing,
    permission: sitePermissions.studentGroupListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createStudentSpecialization,
    permission: sitePermissions.createStudentSpecialization,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.studentSpecializationsListing,
    permission: sitePermissions.studentSpecializationsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicSemesterType,
    permission: sitePermissions.createAcademicSemesterType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSemesterTypesListing,
    permission: sitePermissions.academicSemesterTypesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicLetterGrade,
    permission: sitePermissions.createAcademicLetterGrade,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicLetterGradesListing,
    permission: sitePermissions.academicLetterGradesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicSection,
    permission: sitePermissions.createAcademicSection,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSectionsListing,
    permission: sitePermissions.academicSectionsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSectionRoomsListing,
    permission: sitePermissions.academicSectionRoomsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicTemplateCourse,
    permission: sitePermissions.createAcademicTemplateCourse,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicTemplateCoursesListing,
    permission: sitePermissions.academicTemplateCoursesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicInternship,
    permission: sitePermissions.createAcademicInternship,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicInternshipsListing,
    permission: sitePermissions.academicInternshipsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicManageExamIncharge,
    permission: sitePermissions.academicManageExamIncharge,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicExamIncharge,
    permission: sitePermissions.academicExamIncharge,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicSyncGradeTemplates,
    permission: sitePermissions.academicSyncGradeTemplates,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.studentClearenceListing,
    permission: sitePermissions.studentClearenceListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.academicPlanofStudies,
    permission: sitePermissions.academicPlanofStudies,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createStudyPlans,
    permission: sitePermissions.createStudyPlans,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAcademicSession,
    permission: sitePermissions.createAcademicSession,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.planOfStudyCourseListing,
    permission: sitePermissions.planOfStudyCourseListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.planOfStudyStudentListing,
    permission: sitePermissions.planOfStudyStudentListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.hrManagementLeaveDashboard,
    permission: sitePermissions.hrManagementLeaveDashboard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createOvertimeSlot,
    permission: sitePermissions.createOvertimeSlot,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.overtimeSlotsListing,
    permission: sitePermissions.overtimeSlotsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.absentEmployeesListing,
    permission: sitePermissions.absentEmployeesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.leaveCancellationListing,
    permission: sitePermissions.leaveCancellationListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.allocateCourseRoomListing,
    permission: sitePermissions.allocateCourseRoomListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.releasedLeaveBalancingReportListing,
    permission: sitePermissions.releasedLeaveBalancingReportListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAuthorityBoard,
    permission: sitePermissions.createAuthorityBoard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.authorityBoardsListing,
    permission: sitePermissions.authorityBoardsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createTeachersTitle,
    permission: sitePermissions.createTeachersTitle,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.teachersTitlesListing,
    permission: sitePermissions.teachersTitlesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCourseType,
    permission: sitePermissions.createCourseType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.courseTypesListing,
    permission: sitePermissions.courseTypesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.remunerationListing,
    permission: sitePermissions.remunerationListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.overtimeManualEntryListing,
    permission: sitePermissions.overtimeManualEntryListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.remunerationSettingsListing,
    permission: sitePermissions.remunerationSettingsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.employeesOvertimeListing,
    permission: sitePermissions.employeesOvertimeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.requestedLeavesListing,
    permission: sitePermissions.requestedLeavesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.myAttendanceList,
    permission: sitePermissions.myAttendanceList,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLeaveRequestion,
    permission: sitePermissions.createLeaveRequestion,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.leaveTypeListing,
    permission: sitePermissions.leaveTypeListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createLeaveTypes,
    permission: sitePermissions.createLeaveTypes,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.setOffDays,
    permission: sitePermissions.setOffDays,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.requestDetails,
    permission: sitePermissions.requestDetails,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createAuthorityBoard,
    permission: sitePermissions.createAuthorityBoard,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.authorityBoardsListing,
    permission: sitePermissions.authorityBoardsListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createTeachersTitle,
    permission: sitePermissions.createTeachersTitle,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.teachersTitlesListing,
    permission: sitePermissions.teachersTitlesListing,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.createCourseType,
    permission: sitePermissions.createCourseType,
    domains: [domains.subDomain],
  },
  {
    path: siteRoutes.courseTypesListing,
    permission: sitePermissions.courseTypesListing,
    domains: [domains.subDomain],
  },
];
