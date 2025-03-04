import { siteRoutes } from "utils/helpers/enums/routes.enum";

const getPathToSetRoute = (path: string, isModule: boolean = false): string => {
  const splittedPath: string[] = path.split("/");
  const pagePath: string = splittedPath[splittedPath.length - 1];
  let pathToReturn: string = "";
  if (isModule) {
    const modulePath: string = splittedPath[splittedPath.length - 2];
    pathToReturn = `${modulePath}/${pagePath}`;
  } else {
    pathToReturn = pagePath;
  }
  return pathToReturn;
};

export const breadcrumbs: any = {
  // "create-organization": [
  //   { title: "Organization /", path: siteRoutes.organizationListing },
  //   { title: "Add Organization", path: siteRoutes.createOrganization },
  // ],
  // "organization-listing": [
  //   { title: "Organization /", path: "" },
  //   { title: "Organizations", path: siteRoutes.organizationListing },
  // ],
  // "view-organization": [
  //   { title: "Organization /", path: siteRoutes.organizationListing },
  //   { title: "Organization Detail", path: siteRoutes.viewOrganization },
  // ],
  // "structure-types-listing": [
  //   {
  //     title: "Organization /",
  //     path: "/private/organization/org/organization-listing",
  //   },
  //   {
  //     title: "Structure Types",
  //     path: "/private/organization/structure-types/structure-types-listing",
  //   },
  // ],
  // "create-structure-type": [
  //   {
  //     title: "Organization /",
  //     path: "/private/organization/org/organization-listing",
  //   },
  //   {
  //     title: "Structure Types /",
  //     path: "/private/organization/structure-types/structure-types-listing",
  //   },
  //   {
  //     title: "Add Structure Type",
  //     path: "/private/organization/structure-types/create-structure-type",
  //   },
  // ],
  // "create-organizational-structure": [
  //   {
  //     title: "Organization /",
  //     path: "/private/organization/org/organization-listing",
  //   },
  //   {
  //     title: "Add Organizational Structure ",
  //     path: "/private/organization/org-structure/create-organizational-structure",
  //   },
  // ],
  // "organizational-structure-listing": [
  //   {
  //     title: "Organization /",
  //     path: "/private/organization/org/organization-listing",
  //   },
  //   {
  //     title: "Organizational Structure Listing",
  //     path: "/private/organization/org-structure/organizational-structure-listing",
  //   },
  // ],
  // "assets-listing": [
  //   {
  //     title: "Organization /",
  //     path: "/private/organization/org/organization-listing",
  //   },
  //   {
  //     title: "Assets",
  //     path: "/private/organization/assets-management/assets-listing",
  //   },
  // ],
  // "create-asset": [
  //   {
  //     title: "Organization /",
  //     path: "/private/organization/org/organization-listing",
  //   },
  //   {
  //     title: "Add Assets",
  //     path: "/private/organization/assets-management/create-asset",
  //   },
  // ],
  "create-building": [
    {
      title: "Infrastructure & Asset Management /",
      path: "",
    },
    {
      title: "Add Building",
      path: "/private/organization/buildings-management/create-building",
    },
  ],
  "buildings-listing": [
    {
      title: "Infrastructure & Asset Management /",
      path: "",
    },
    {
      title: "Building Listing",
      path: "/private/organization/buildings-management/buildings-listing",
    },
  ],
  "create-program": [
    {
      title: "Academics /",
      path: "/private/academics/programs/programs-listing",
    },
    {
      title: "Create Program",
      path: "/private/academics/programs/create-program",
    },
  ],
  "programs-listing": [
    {
      title: "Academics /",
      path: "/private/organization/org/organization-listing",
    },
    {
      title: "Programs Listing",
      path: "/private/academics/programs/programs-listing",
    },
  ],
  "e-portal-dashboard": [
    { title: "Admission Eportal /", path: "" },
    { title: "Eportal Home", path: siteRoutes.ePortalDashboard },
  ],
  "short-courses-listing": [
    { title: "Dashboard /", path: "/private/e-portal" },
    { title: "Short Courses", path: "/private/e-portal/short-courses-listing" },
  ],
  "edit-profile": [
    {
      title: "Admission Eportal /",
      path: "/private/e-portal/e-portal-dashboard",
    },
    {
      title: "Edit Profile",
      path: "/private/e-portal/user-profile/edit-profile",
    },
  ],
  "my-vouchers": [
    { title: "Eportal /", path: "/private/e-portal" },
    { title: "My Vouchers", path: "/private/e-portal/my-vouchers" },
  ],
  "challan-listing": [
    { title: "Eportal /", path: "/private/e-portal" },
    { title: "Generate Challan", path: "/private/e-portal/challan-listing" },
  ],
  "create-hostel": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Add Hostel", path: siteRoutes.createHostel },
  ],
  "hostel-listing": [
    { title: "Hostel Management /", path: "" },
    { title: "Hostel Listing", path: siteRoutes.hostelListing },
  ],
  "hostel-rooms-listing": [
    { title: "Hostel Management /", path: "" },
    { title: "Hostel Rooms", path: siteRoutes.hostelRoomsListing },
  ],
  "create-hostel-room": [
    { title: "Hostel Management /", path: siteRoutes.hostelRoomsListing },
    { title: "Add Hostel Rooms", path: siteRoutes.createHostelRoom },
  ],
  "applicant-listing": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Applicant Listing", path: siteRoutes.applicantListing },
  ],
  "create-applicant": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Add Applicant", path: siteRoutes.createApplicant },
  ],
  "merit-listing": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Merit List", path: siteRoutes.hostelMeritListing },
  ],
  "create-merit": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Add New Merit List", path: siteRoutes.createHostelMerit },
  ],
  "hostel-session-listing": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Sessions", path: siteRoutes.hostelSessionListing },
  ],
  "create-hostel-session": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Add New Session", path: siteRoutes.createHostelSession },
  ],
  "hostel-finance-management": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    {
      title: "Finance | Applicant Applied for Hostels",
      path: siteRoutes.hostelFinanceManagement,
    },
  ],
  "applied-applicant": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    {
      title: "Applicant Applied for Hostels",
      path: siteRoutes.appliedApplicant,
    },
  ],
  "applicant-enrollment": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    {
      title: "Applicant Hostel Enrollment List",
      path: siteRoutes.applicantEnrollment,
    },
  ],
  "registered-applicant": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    { title: "Registered Applicant", path: siteRoutes.registeredApplicant },
  ],
  "hostel-applicant-merit-list": [
    { title: "Hostel Management /", path: siteRoutes.hostelListing },
    {
      title: "Hostel Applicant Merit List",
      path: siteRoutes.hostelApplicantMeritList,
    },
  ],
  "eportal-hostel-portal": [
    { title: "Hostel Management /", path: "" },
    { title: "Hostel Portal", path: siteRoutes.eportalHostelPortal },
  ],
  "create-admission-session": [
    { title: "Admission /", path: siteRoutes.admissionSessionListing },
    { title: "Admission Sessions /", path: siteRoutes.admissionSessionListing },
    {
      title: "Create Admission Session",
      path: siteRoutes.createAdmissionSession,
    },
  ],
  "admission-session-listing": [
    { title: "Admission /", path: "" },
    { title: "Admission Sessions", path: siteRoutes.admissionSessionListing },
  ],
  "admission-campaigns-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Admission Campaigns ",
      path: siteRoutes.admissionCampaignListing,
    },
  ],
  "create-admission-campaign": [
    { title: "Admission /", path: "" },
    { title: "Admission Campaigns /", path: "" },
    { title: "Admission Announce", path: siteRoutes.createAdmissionCampaign },
  ],
  "admission-students-listing": [
    { title: "Admission /", path: "" },
    { title: "Student Listing", path: siteRoutes.admissionStudentListing },
  ],
  "admission-applicants-listing": [
    { title: "Admission /", path: "" },
    { title: "Applicant Listing", path: siteRoutes.admissionApplicantsListing },
  ],
  "edit-admission-document": [
    { title: "Admission /", path: "" },
    { title: "Edit/View Document", path: siteRoutes.editAdmissionDocument },
  ],
  "admission-documents-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Offer Letter Templates",
      path: siteRoutes.admissionDocumentListing,
    },
  ],
  "create-admission-test-type": [
    { title: "Admission /", path: "" },
    { title: "Test Types /", path: siteRoutes.admissionTestTypesListing },
    { title: "Add Test Types", path: siteRoutes.createAdmissionTestType },
  ],
  "admission-test-types-listing": [
    { title: "Admission /", path: "" },
    { title: "Test Types", path: siteRoutes.admissionTestTypesListing },
  ],
  "student-registration-listing": [
    { title: "Admission /", path: "" },
    { title: "Student Registration", path: siteRoutes.studentRegListing },
  ],
  "admission-merit-listing": [
    { title: "Admission /", path: "" },
    { title: "Merit List", path: siteRoutes.admissionMeritListing },
  ],
  "create-admission-offer-letter": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Offer Letter Templates /",
      path: siteRoutes.admissionOfferLetterListing,
    },
    {
      title: "Edit/View Offer Letter Templates",
      path: siteRoutes.createAdmissionOfferLetter,
    },
  ],
  "admission-offer-letters-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Offer Letter Templates",
      path: siteRoutes.admissionOfferLetterListing,
    },
  ],
  "edit-admission-board": [
    { title: "Admission /", path: "" },
    { title: "Edit/View Board", path: siteRoutes.editAdmissionBoard },
  ],
  "edit-admission-certificate": [
    { title: "Admission /", path: "" },
    {
      title: "Edit/View Certificate Degree",
      path: siteRoutes.editAdmissionCertificate,
    },
  ],
  "admission-documents-master-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Edit/View Certificate Degree",
      path: siteRoutes.admissionManageDocumentsMasterListing,
    },
  ],
  "admission-eligibility-template-headers-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Eligibility Templates Header",
      path: siteRoutes.admissioneligibilityTemplateHeadersListing,
    },
  ],
  "create-admission-eligibility-template-header": [
    { title: "Admission /", path: "" },
    {
      title: "Eligibility Templates Header /",
      path: siteRoutes.admissioneligibilityTemplateHeadersListing,
    },
    {
      title: "Add Eligibility Templates Header",
      path: siteRoutes.createAdmissioneligibilityTemplateHeaders,
    },
  ],
  "admission-eligibility-template-bodies-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Eligibility Templates Header /",
      path: siteRoutes.admissioneligibilityTemplateHeadersListing,
    },
    {
      title: "Templates Body Details",
      path: siteRoutes.admissioneligibilityTemplateBodiesListing,
    },
  ],
  "create-admission-eligibility-template-body": [
    { title: "Admission /", path: "" },
    {
      title: "Eligibility Templates Header /",
      path: siteRoutes.admissioneligibilityTemplateHeadersListing,
    },
    {
      title: "Add Template Body",
      path: siteRoutes.createAdmissioneligibilityTemplateBody,
    },
  ],
  "admission-quotas-listing": [
    { title: "Admission /", path: "" },
    { title: "Manage quotas", path: siteRoutes.admissionQuotasListing },
  ],
  "create-admission-quotas": [
    { title: "Admission /", path: "" },
    { title: "Manage Quotas /", path: siteRoutes.admissionQuotasListing },
    { title: "Add Quota", path: siteRoutes.createAdmissionQuotas },
  ],
  "result-type-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Result Types ", path: siteRoutes.resultTypeListing },
  ],
  "result-type-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Create Result Type", path: siteRoutes.resultTypeCreate },
  ],
  "certificate-link-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Certificate Links to result type",
      path: siteRoutes.certificateLinkListing,
    },
  ],
  "certificate-link-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Create New Role", path: siteRoutes.certificateLinkCreate },
  ],
  "roll-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Create New Role", path: siteRoutes.rollManagementCreate },
  ],
  "role-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Role Management", path: siteRoutes.roleManagementListing },
  ],
  "board-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Board Managemment", path: siteRoutes.boardManagementListing },
  ],
  "board-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Add Board", path: siteRoutes.boardManagementCreate },
  ],
  "subject-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Manage Subjects", path: siteRoutes.subjectManagementListing },
  ],
  "subject-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Add Subjects", path: siteRoutes.subjectManagementCreate },
  ],
  "certificate-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Manage Certificate / Degree",
      path: siteRoutes.certificateManagementListing,
    },
  ],
  "certificate-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Add Certificate / Degree",
      path: siteRoutes.certificateManagementCreate,
    },
  ],
  "super-admin-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Super Admin", path: siteRoutes.superAdminManagementListing },
  ],
  "super-admin-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Add Super Admin", path: siteRoutes.superAdminManagementCreate },
  ],
  "super-role-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Role Management", path: siteRoutes.superRoleManagementListing },
  ],
  "super-role-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Create New Role", path: siteRoutes.superRoleManagementCreate },
  ],
  "permission-management-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Permission Management",
      path: siteRoutes.permissionManagementListing,
    },
  ],
  "permission-management-create": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: " Super Admins", path: siteRoutes.permissionManagementCreate },
  ],
  "module-management": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    { title: "Modules", path: siteRoutes.moduleManagement },
  ],
  "linked-specialization-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Programs /",
      path: "/private/organization/programs/programs-listing",
    },
    {
      title: "Linked Specializations",
      path: siteRoutes.linkedSpecializationListing,
    },
  ],
  "linked-program-entry-test-listing": [
    { title: "Admissions /", path: siteRoutes.organizationListing },
    { title: "Programs /", path: siteRoutes.programListing },
    {
      title: "Linked Program to Entry Test",
      path: siteRoutes.linkedProgramEntryTestListing,
    },
  ],
  "create-linked-program-entry-test": [
    { title: "Admission /", path: siteRoutes.organizationListing },
    { title: "Program /", path: siteRoutes.linkedProgramEntryTestListing },
    {
      title: "Linked Program to Entry Test",
      path: siteRoutes.createLinkedProgramEntryTest,
    },
  ],
  "academic-session-organization-listing": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Academic Session Listing",
      path: siteRoutes.academicSessionOrganizationListing,
    },
  ],
  "create-academic-session-organization": [
    { title: "Organization /", path: siteRoutes.organizationListing },
    {
      title: "Add Session Listing",
      path: siteRoutes.createAcademicSessionOrganization,
    },
  ],
  "admission-program-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Admission Campaigns /",
      path: siteRoutes.admissionCampaignListing,
    },
    { title: "Programs", path: siteRoutes.admissionProgramListing },
  ],
  "admission-subject-management-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Subjects",
      path: siteRoutes.admissionSubjectManagementListing,
    },
  ],
  "create-admission-subject-management": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Subjects /",
      path: siteRoutes.admissionSubjectManagementListing,
    },
    { title: "Add Subject", path: siteRoutes.createAdmissionSubjectManagement },
  ],
  "admission-board-management-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Boards",
      path: siteRoutes.admissionBoardManagementListing,
    },
  ],
  "create-admission-board-management": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Boards /",
      path: siteRoutes.admissionBoardManagementListing,
    },
    { title: "Add Boards", path: siteRoutes.createAdmissionBoardManagement },
  ],
  "admission-certificate-management-listing": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Certificate / Degree",
      path: siteRoutes.admissionCertificatemanagementListing,
    },
  ],
  "create-admission-certificate-management": [
    { title: "Admission /", path: "" },
    {
      title: "Manage Certificate / Degree /",
      path: siteRoutes.admissionCertificatemanagementListing,
    },
    {
      title: "Add Certificate / Degree",
      path: siteRoutes.createAdmissionCertificateManagement,
    },
  ],
  "merit-keys-listing": [
    { title: "Admission /", path: "" },
    { title: "Merit Keys", path: siteRoutes.meritKeysListing },
  ],
  "create-merit-keys": [
    { title: "Admission /", path: "" },
    { title: "Merit Keys /", path: siteRoutes.meritKeysListing },
    { title: "Add Merit Keys", path: siteRoutes.createMeritKeys },
  ],
  "merit-list-formula-listing": [
    { title: "Admission /", path: "" },
    { title: "Merit List Formula", path: siteRoutes.meritListFormulaListing },
  ],
  "create-merit-list-formula": [
    { title: "Admission /", path: "" },
    { title: "Program Merit List /", path: siteRoutes.meritListFormulaListing },
    { title: "Add Merit Formula", path: siteRoutes.createMeritListFormula },
  ],
  "major-categories-listing": [
    {
      title: "Infrastructure & Asset Management /",
      path: "",
    },
    { title: "Assets /", path: siteRoutes.assetsListing },
    { title: "Major Categories", path: siteRoutes.majorCategoriesListing },
  ],
  "create-major-categories": [
    {
      title: "Infrastructure & Asset Management /",
      path: "",
    },
    { title: "Assets /", path: siteRoutes.assetsListing },
    { title: "Major Categories /", path: siteRoutes.majorCategoriesListing },
    { title: "Add Major Categories", path: siteRoutes.CreateMajorCategories },
  ],
  "minor-categories-listing": [
    { title: "Infrastructure & Asset Management /", path: "" },
    { title: "Assets /", path: siteRoutes.assetsListing },
    { title: "Minor Categories", path: siteRoutes.minorCategoriesListing },
  ],
  "create-minor-categories": [
    { title: "Infrastructure & Asset Management /", path: "" },
    { title: "Assets /", path: siteRoutes.assetsListing },
    { title: "Minor Categories /", path: siteRoutes.minorCategoriesListing },
    { title: "Add Minor Categories", path: siteRoutes.createMinorCategories },
  ],
  "rooms-listing": [
    { title: "Infrastructure & Asset Management /", path: "" },
    { title: "Buildings /", path: siteRoutes.buildingListing },
    { title: "Rooms", path: siteRoutes.roomsListing },
  ],
  "create-rooms": [
    { title: "Infrastructure & Asset Management/", path: "" },
    { title: "Buildings /", path: siteRoutes.buildingListing },
    { title: "Rooms /", path: siteRoutes.roomsListing },
    { title: "Add Rooms", path: siteRoutes.createRooms },
  ],
  "eportal-application-listing": [
    { title: "Eportal /", path: siteRoutes.ePortalDashboard },
    { title: "Application List", path: siteRoutes.eportalAdmissionsListing },
  ],
  "create-eportal-application-list": [
    { title: "Eportal /", path: siteRoutes.ePortalDashboard },
    { title: "Application List /", path: siteRoutes.eportalAdmissionsListing },
    {
      title: "Apply for Admissions",
      path: siteRoutes.createEportalAdmissionList,
    },
  ],
  "AdmissionQuota-list": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    { title: "Qouta List", path: siteRoutes.quotasAdmissionListing },
  ],
  "AdmissionQuota-create": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    { title: "Qouta List /", path: siteRoutes.quotasAdmissionListing },
    { title: "Add Program Quota", path: siteRoutes.createQuotasAdmissionList },
  ],
  "ManageMeritList-list": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    { title: "Manage Merit List", path: siteRoutes.manageMeritListListing },
  ],
  "ManageMeritList-create": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    { title: "Manage Merit List", path: siteRoutes.manageMeritListListing },
    {
      title: "Add Merit List",
      path: siteRoutes.createAdmissionManageMeritList,
    },
  ],
  "quota-list-program-listing": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    { title: "Quotas List /", path: siteRoutes.quotasAdmissionListing },
    {
      title: "Program link to quota",
      path: siteRoutes.qoutasListProgramListing,
    },
  ],
  "ProgramLinkTemplate-list": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    {
      title: "Admission Campaigns/",
      path: siteRoutes.admissionCampaignListing,
    },
    { title: "Programs /", path: siteRoutes.programListing },
    {
      title: "Eligibility Templates",
      path: siteRoutes.eligibilityTemplatesListing,
    },
  ],
  "ProgramLinkTemplate-create": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    {
      title: "Admission Campaigns/",
      path: siteRoutes.admissionCampaignListing,
    },
    { title: "Programs /", path: siteRoutes.programListing },
    {
      title: "Eligibility Templates /",
      path: siteRoutes.eligibilityTemplatesListing,
    },
    {
      title: "Program Linked to Eligibility Templates",
      path: siteRoutes.eligibilityTemplatesCreate,
    },
  ],
  "ProgramLinkMerit-list": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    {
      title: "Admission Campaigns /",
      path: siteRoutes.admissionCampaignListing,
    },
    { title: "Programs /", path: siteRoutes.admissionProgramListing },
    { title: "Merit Links", path: siteRoutes.programLinkMeritList },
  ],

  "ProgramLinkMerit-create": [
    { title: "Admission /", path: siteRoutes.admissionCampaignListing },
    {
      title: "Admission Campaigns /",
      path: siteRoutes.admissionCampaignListing,
    },
    { title: "Programs /", path: siteRoutes.admissionProgramListing },
    { title: "Eligibility Templates /", path: "" },
    {
      title: "Link Program to Entry Test",
      path: siteRoutes.createProgramLinkMeritList,
    },
  ],
  "finance-dashboard": [
    { title: "Finance /", path: "" },
    { title: "Dashboard", path: siteRoutes.financeDashboard },
  ],
  "system-logs-listing": [
    { title: "System Administration  /", path: "" },
    { title: " System Error Logs", path: siteRoutes.systemLogsListing },
  ],
  "system-users-listing": [
    { title: "System Administration  /", path: "" },
    { title: " Users", path: siteRoutes.systemUsersListing },
  ],
  "create-system-users": [
    { title: "System Administration  /", path: "" },
    { title: " Users /", path: siteRoutes.systemUsersListing },
    { title: "Add Users", path: siteRoutes.createSystemUsers },
  ],
  "system-menus-listing": [
    { title: "System Administration  /", path: "" },
    { title: "Menus", path: siteRoutes.systemMenusListing },
  ],
  "create-system-menus": [
    { title: "System Administration  /", path: "" },
    { title: "Menus /", path: siteRoutes.systemMenusListing },
    { title: "Add Menus", path: siteRoutes.createSystemMenus },
  ],
  "unregistered-menus-listing": [
    { title: "System Administration  /", path: "" },
    { title: "Unregistered Menu", path: siteRoutes.unregisteredMenusListing },
  ],
  "user-audit-listing": [
    { title: "System Administration  /", path: "" },
    { title: "User Audit", path: siteRoutes.userAuditListing },
  ],
  "workflow-listing": [
    { title: "System Administration  /", path: "" },
    { title: "Workflow", path: siteRoutes.workflowListing },
  ],
  "create-workflow": [
    { title: "System Administration  /", path: "" },
    { title: "Workflow /", path: siteRoutes.workflowListing },
    { title: "Add Workflow", path: siteRoutes.createWorkflow },
  ],
  "student-financial-clearance-listing": [
    { title: "Finance /", path: "" },
    {
      title: "Student Financial Clearance ",
      path: siteRoutes.studentFinancialClearanceListing,
    },
  ],
  "check-financial-challan-status": [
    { title: "Finance /", path: "" },
    { title: "Challan Status", path: siteRoutes.checkFinancialChallanStatus },
  ],
  "create-fine-slot": [
    { title: "Finance /", path: "" },
    { title: "Fine slots /", path: siteRoutes.fineSlotsListing },
    { title: "Add Fine slot", path: siteRoutes.createFineSlot },
  ],
  "fine-slots-listing": [
    { title: "Finance /", path: "" },
    { title: "Fine slots", path: siteRoutes.fineSlotsListing },
  ],
  "template-program-account-code-listing": [
    { title: "Finance /", path: "" },
    {
      title: "Template Programs Account code",
      path: siteRoutes.templateProgramAccountCodeListing,
    },
  ],
  "voucher-types-listing": [
    { title: "Finance /", path: "" },
    { title: "Voucher Types", path: siteRoutes.voucherTypesListing },
  ],
  "create-voucher-type": [
    { title: "Finance /", path: "" },
    { title: "Add Voucher Type", path: siteRoutes.createVoucherType },
  ],
  "create-finance-application": [
    { title: "Finance /", path: "" },
    { title: "Applications /", path: siteRoutes.financeApplicationsListing },
    { title: "Add Application", path: siteRoutes.createFinanceApplications },
  ],
  "finance-applications-listing": [
    { title: "Finance /", path: "" },
    { title: "Applications", path: siteRoutes.financeApplicationsListing },
  ],
  "application-template-link-listing": [
    { title: "Finance /", path: "" },
    {
      title: "Applications Template Link",
      path: siteRoutes.applicationTemplateLinkListing,
    },
  ],
  "create-application-template-link": [
    { title: "Finance /", path: "" },
    {
      title: "Add Application Template Link",
      path: siteRoutes.createApplicationTemplateLink,
    },
  ],
  "create-voucher-template-header": [
    { title: "Finance /", path: "" },
    {
      title: "Add Template Header",
      path: siteRoutes.createVoucherTemplateHeader,
    },
  ],
  "voucher-template-header-listing": [
    { title: "Finance /", path: "" },
    {
      title: "Voucher Template Header",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
  ],
  "create-bank": [
    { title: "Finance /", path: "" },
    { title: "Banks /", path: siteRoutes.banksListing },
    { title: "Add Bank", path: siteRoutes.createBank },
  ],
  "banks-listing": [
    { title: "Finance /", path: "" },
    { title: "Banks /", path: siteRoutes.banksListing },
  ],
  "bank-transactions-logs-listing": [
    { title: "Finance /", path: "" },
    {
      title: "Bank Transitions Log /",
      path: siteRoutes.bankTransactionLogsListing,
    },
  ],
  "bank-scroll-logs-listing": [
    { title: "Finance /", path: "" },
    { title: "Bank Scroll Logs /", path: siteRoutes.bankScrollLogsListing },
  ],
  "create-voucher-particular": [
    { title: "Finance /", path: "" },
    {
      title: "Voucher Particulars /",
      path: siteRoutes.voucherParticularListing,
    },
    {
      title: "Add Voucher Particular",
      path: siteRoutes.createVoucherParticular,
    },
  ],
  "voucher-particulars-listing": [
    { title: "Finance /", path: "" },
    {
      title: "Voucher Particulars ",
      path: siteRoutes.voucherParticularListing,
    },
  ],
  "master-book-listing": [
    { title: "Finance /", path: "" },
    { title: "Master Book List", path: siteRoutes.masterBookListing },
  ],
  "master-book-transaction-detail": [
    { title: "Finance /", path: "" },
    { title: "Master Book /", path: siteRoutes.masterBookListing },
    {
      title: "Transaction Detail",
      path: siteRoutes.masterBookTransactionDetail,
    },
  ],
  "show-master-book-transaction-detail": [
    { title: "Finance /", path: "" },
    { title: "Master Book /", path: siteRoutes.masterBookListing },
    {
      title: "Show Transaction Detail",
      path: siteRoutes.showMasterBookTransactionDetail,
    },
  ],
  "eportal-career-listing": [
    { title: "Eportal /", path: "" },
    { title: "Careers /", path: "" },
    {
      title: "Jobs",
      path: siteRoutes.eportalCareersListing,
    },
  ],
  "create-eportal-career": [
    { title: "Eportal /", path: "" },
    { title: "Careers /", path: "" },
    {
      title: "Edit Profile",
      path: siteRoutes.createEportalCareer,
    },
  ],
  "eportal-applied-jobs-listing": [
    { title: "Eportal /", path: "" },
    { title: "Careers /", path: "" },
    {
      title: "Applied Jobs",
      path: siteRoutes.eportalAppliedJobListing,
    },
  ],
  "career-profile-listing": [
    { title: "Eportal /", path: "" },
    { title: "Careers /", path: "" },
    {
      title: "Career Profile",
      path: siteRoutes.eportalCarrerProfile,
    },
  ],
  ///    admin-career-breadcrumbs
  "career-designation-listing": [
    { title: "Careers /", path: "" },
    {
      title: "Designations",
      path: siteRoutes.careerDesignationListing,
    },
  ],
  "create-career-designation": [
    { title: "Careers /", path: "" },
    {
      title: "Designations /",
      path: siteRoutes.careerDesignationListing,
    },
    {
      title: "Add Designation ",
      path: siteRoutes.createCareerDesignation,
    },
  ],
  "career-advertisement-listing": [
    { title: "Careers /", path: "" },

    {
      title: "Advertisement ",
      path: siteRoutes.careerAdvertisementListing,
    },
  ],
  "create-career-advertisement": [
    { title: "Careers /", path: "" },

    {
      title: "Advertisement /",
      path: siteRoutes.careerAdvertisementListing,
    },
    {
      title: "Add Advertisement ",
      path: siteRoutes.createCareerAdvertisement,
    },
  ],
  "post-template-listing": [
    { title: "Careers /", path: "" },

    {
      title: "Post Templates",
      path: siteRoutes.careerPostTemplateListing,
    },
  ],
  "create-post-template": [
    { title: "Careers /", path: "" },

    {
      title: "Post Templates /",
      path: siteRoutes.careerPostTemplateListing,
    },
    {
      title: "Add Post Templates",
      path: siteRoutes.createCareerPostTemplate,
    },
  ],
  "career-post-listing": [
    { title: "Careers /", path: "" },

    {
      title: "Post",
      path: siteRoutes.careerPostListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.createCareerPost)]: [
    { title: "Careers /", path: "" },

    {
      title: "Post /",
      path: siteRoutes.careerPostListing,
    },
    {
      title: "Add Post",
      path: siteRoutes.createCareerPost,
    },
  ],
  [getPathToSetRoute(siteRoutes.careerApplicantListing)]: [
    { title: "Careers /", path: "" },

    {
      title: "Applicant",
      path: siteRoutes.careerApplicantListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.voucherTemplateBodiesListing)]: [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Voucher Templates Bodies",
      path: siteRoutes.voucherTemplateBodiesListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.financeInstallmentListing)]: [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Installments",
      path: siteRoutes.financeInstallmentListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.createFinanceInstallment)]: [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Installments /",
      path: siteRoutes.financeInstallmentListing,
    },
    {
      title: "Add Installment",
      path: siteRoutes.createFinanceInstallment,
    },
  ],
  [getPathToSetRoute(siteRoutes.installmentSlotListing)]: [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Installments /",
      path: siteRoutes.financeInstallmentListing,
    },
    {
      title: "Installments Slots",
      path: siteRoutes.installmentSlotListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.createInstallmentSlot)]: [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Installments /",
      path: siteRoutes.financeInstallmentListing,
    },
    {
      title: "Installments Slots /",
      path: siteRoutes.installmentSlotListing,
    },
    {
      title: "Add Installments Slots",
      path: siteRoutes.createInstallmentSlot,
    },
  ],
  [getPathToSetRoute(siteRoutes.slotsInstallmentParticulars)]: [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Installments /",
      path: siteRoutes.financeInstallmentListing,
    },
    {
      title: "Installments Slots /",
      path: siteRoutes.installmentSlotListing,
    },
    {
      title: "Manage Slots Installment Particular",
      path: siteRoutes.slotsInstallmentParticulars,
    },
  ],

  [getPathToSetRoute(siteRoutes.certificateLevelList)]: [
    { title: "Organization /", path: "" },

    {
      title: "Certificate Levels",
      path: siteRoutes.certificateLevelList,
    },
  ],
  [getPathToSetRoute(siteRoutes.createCertificateLevels)]: [
    { title: "Organization /", path: "" },

    {
      title: "Certificate Levels /",
      path: siteRoutes.certificateLevelList,
    },
    {
      title: "Add Certificate Levels ",
      path: siteRoutes.createCertificateLevels,
    },
  ],

  [getPathToSetRoute(siteRoutes.authoritiesListing)]: [
    { title: "Authorities & Committees /", path: "" },

    {
      title: "Authorities & Committees ",
      path: siteRoutes.authoritiesListing,
    },
  ],
  // [getPathToSetRoute(siteRoutes.createAuthorities)]: [
  //   {
  //     title: "Authorities & Committees /",
  //     path: siteRoutes.authoritiesListing,
  //   },

  //   {
  //     title: "Add Authorities & Committees ",
  //     path: siteRoutes.createAuthorities,
  //   },
  // ],
  [getPathToSetRoute(siteRoutes.viewMembers)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "View Members ",
      path: siteRoutes.viewMembers,
    },
  ],
  [getPathToSetRoute(siteRoutes.viewDocuments)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "View/Download Document  ",
      path: siteRoutes.viewDocuments,
    },
  ],
  [getPathToSetRoute(siteRoutes.senateMeetingList)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Senate Meetings  ",
      path: siteRoutes.senateMeetingList,
    },
  ],
  [getPathToSetRoute(siteRoutes.councilNotificationsListing)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Academic Council Notifications  ",
      path: siteRoutes.councilNotificationsListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.createCouncilNotifications)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Add Academic Council Notifications  ",
      path: siteRoutes.createCouncilNotifications,
    },
  ],
  [getPathToSetRoute(siteRoutes.authorityMemberTypeListing)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Authority & Committee Member Types  ",
      path: siteRoutes.authorityMemberTypeListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.createAuthorityMemberType)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Add Authority & Committee Member Types  ",
      path: siteRoutes.createAuthorityMemberType,
    },
  ],
  [getPathToSetRoute(siteRoutes.authorityTypeListing)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: " Authority & Committee Types  ",
      path: siteRoutes.authorityTypeListing,
    },
  ],
  [getPathToSetRoute(siteRoutes.createAuthorityType)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Add Authority & Committee Types  ",
      path: siteRoutes.createAuthorityType,
    },
  ],
  [getPathToSetRoute(siteRoutes.createSenateMeeting)]: [
    {
      title: "Authorities & Committees /",
      path: siteRoutes.authoritiesListing,
    },

    {
      title: "Add Senate Meetings",
      path: siteRoutes.createSenateMeeting,
    },
  ],
  [getPathToSetRoute(siteRoutes.testingServicesDashboard)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Dashboard ",
      path: siteRoutes.testingServicesDashboard,
    },
  ],
  [getPathToSetRoute(siteRoutes.TestingServicesTestCenterlist)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Test Centers",
      path: siteRoutes.TestingServicesTestCenterlist,
    },
  ],
  [getPathToSetRoute(siteRoutes.TestingServicesTestCentercreate)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Test Centers /",
      path: siteRoutes.TestingServicesTestCenterlist,
    },
    {
      title: "Add Test Center",
      path: siteRoutes.TestingServicesTestCentercreate,
    },
  ],
  [getPathToSetRoute(siteRoutes.TestingServicesTestSchedulelist)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Schedules",
      path: siteRoutes.TestingServicesTestSchedulelist,
    },
  ],
  [getPathToSetRoute(siteRoutes.createTestingServicesTestSchedule)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Schedules /",
      path: siteRoutes.TestingServicesTestSchedulelist,
    },
    {
      title: "Add Schedule",
      path: siteRoutes.createTestingServicesTestSchedule,
    },
  ],
  [getPathToSetRoute(siteRoutes.testingServicespublishresult)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Students Mark Sheet",
      path: siteRoutes.testingServicespublishresult,
    },
  ],
  [getPathToSetRoute(siteRoutes.testingServicescandidateTestResultlist)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Candidates Test Result",
      path: siteRoutes.testingServicescandidateTestResultlist,
    },
  ],
  "create-test-types": [
    { title: "Admission /", path: "" },
    { title: "Test Types /", path: siteRoutes.testTypesListing },
    { title: "Add Test Types", path: siteRoutes.createTestType },
  ],
  "test-types-listing": [
    { title: "Admission /", path: "" },
    { title: "Test Types", path: siteRoutes.testTypesListing },
  ],
  [getPathToSetRoute(siteRoutes.testingCenterRooms)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Candidates Test Result",
      path: siteRoutes.testingCenterRooms,
    },
  ],
  [getPathToSetRoute(siteRoutes.createTestingServicesTestCenterRooms)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Test Centers /",
      path: siteRoutes.TestingServicesTestCenterlist,
    },
    {
      title: "Center room /",
      path: siteRoutes.testingCenterRooms,
    },
    {
      title: "Add Room",
      path: siteRoutes.createTestingServicesTestCenterRooms,
    },
  ],
  [getPathToSetRoute(siteRoutes.testingServicesTestScheduleSeatingPlanlist)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Schedules /",
      path: siteRoutes.TestingServicesTestSchedulelist,
    },
    {
      title: "Seating Plan List",
      path: siteRoutes.testingServicesTestScheduleSeatingPlanlist,
    },
  ],
  [getPathToSetRoute(siteRoutes.testingServicescandidatelisting)]: [
    { title: "Testing Services /", path: "" },
    {
      title: "Candidate Applied List",
      path: siteRoutes.testingServicescandidatelisting,
    },
  ],
  // [getPathToSetRoute(siteRoutes.testingServicesTestScheduleSeatingPlanlist)]: [
  //   { title: "Testing Services /", path: "" },
  //   {
  //     title: "Schedules /",
  //     path: siteRoutes.TestingServicesTestSchedulelist,
  //   },
  //   {
  //     title: "Seating Plan List",
  //     path: siteRoutes.testingServicesTestScheduleSeatingPlanlist,
  //   },
  // ],
};

export const religions: any[] = [
  { title: "Islam" },
  { title: "Jewism" },
  { title: "Christianity" },
  { title: "Hinduism" },
  { title: "Budhism" },
];

// export const createOrgStructureTypeSteps = [
//     { title: 'Choose Structure Type', icon: StructureTypeSvg, active: false, completed: false },
//     { title: 'General Details', icon: GeneralDetailSvg, active: false, completed: false },
//     { title: 'Introduction', icon: IntroductionSvg, active: false, completed: false },
//     { title: 'Done', icon: CheckSvg, active: false, completed: false },
// ]

// export const programsListing = [
//     { title: 'BS Software Engineering', dept: 'Computer Science', campus: 'Rahim Yar Khan', type: 'Semester', creditHours: 3, isExpanded: false },
//     { title: 'BS Software Engineering', dept: 'Computer Science', campus: 'Rahim Yar Khan', type: 'Semester', creditHours: 3, isExpanded: false },
//     { title: 'BS Software Engineering', dept: 'Computer Science', campus: 'Rahim Yar Khan', type: 'Semester', creditHours: 3, isExpanded: false },
//     { title: 'BS Software Engineering', dept: 'Computer Science', campus: 'Rahim Yar Khan', type: 'Semester', creditHours: 3, isExpanded: false },
//     { title: 'BS Software Engineering', dept: 'Computer Science', campus: 'Rahim Yar Khan', type: 'Semester', creditHours: 3, isExpanded: false },
//     { title: 'BS Software Engineering', dept: 'Computer Science', campus: 'Rahim Yar Khan', type: 'Semester', creditHours: 3, isExpanded: false },
// ]
