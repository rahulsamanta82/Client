import { FC, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  MenuItem,
  Menus,
  SidebarMain,
  SiteLogo,
} from "./style";
import {
  AdministrationSvg,
  AdmissionSvg,
  AuthoritiesSvg,
  BooksSvg,
  BuildingsSvg,
  CareerSvg,
  ChallanSvg,
  CoursesSvg,
  CyfyLogoDark,
  CyfyLogoSvg,
  DropdownIcon,
  GraduationSvg,
  HomeSvg,
  HostelSvg,
  HRMangementSvg,
  JobsSvg,
  LegalMatterSvg,
  LibrarySvg,
  MeritListSvg,
  PrivilegesSvg,
  ProfileSvg,
  QECSvg,
  SettingsSolidSvg,
  SideShortCoursesSvg,
  TestingServicesSvg,
  TestingSvg,
  VoucherSvg,
} from "assets/images/common/svgs";
import { useLocation, useNavigate } from "react-router-dom";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import { domains } from "utils/helpers/enums/shared.enums";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useSelector } from "react-redux";
import { FinanceSvg } from "assets/images/finance/svgs";

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: Function;
}
const Sidebar: FC<SidebarProps> = ({ setOpenSidebar }) => {
  const { hasAccess, getDomainType } = useStore();
  const { isCurrentWidthMinimum, splitPathBySlash } = useUtils();
  const { pathname } = useLocation();
  const { organization, isDarkTheme } = useSelector(
    (state: any) => state.sharedReducer
  );
  const sidebarMenus = [
    {
      title: "Dashboard",
      path: splitPathBySlash(siteRoutes.superAdminDashboard)[3],
      subMenus: [],
      permission: sitePermissions.superAdminDashboard,
      icon: HomeSvg,
      link: siteRoutes.superAdminDashboard,
      isDropdownOpen: false,
    },
    {
      title: "Dashboard",
      path: splitPathBySlash(siteRoutes.adminDashboard)[3],
      subMenus: [],
      permission: sitePermissions.adminDashboard,
      icon: HomeSvg,
      link: siteRoutes.adminDashboard,
      isDropdownOpen: false,
    },
    {
      title: "Organization",
      path: splitPathBySlash(siteRoutes.organizationListing)[2],
      icon: BuildingsSvg,
      subMenus: [
        {
          title: "Organization",
          path: siteRoutes.organizationListing,
          active: "org",
          permission: sitePermissions.organizationListing,
          subPagesPermissions: [
            sitePermissions.organizationListing,
            sitePermissions.createOrganization,
          ],
        },
        {
          title: "Structure Types",
          path: siteRoutes.structureTypeListing,
          active: "structure-types",
          permission: sitePermissions.structureTypeListing,
          subPagesPermissions: [
            sitePermissions.structureTypeListing,
            sitePermissions.createStructureType,
          ],
          // adminOptional: !organization?.add_structure_type,
          // superAdminOptional: true
        },
        {
          title: "Organizational Structure",
          path: siteRoutes.orgStructureListing,
          active: "org-structure",
          permission: sitePermissions.orgStructureListing,
          subPagesPermissions: [
            sitePermissions.orgStructureListing,
            sitePermissions.createOrgStructure,
          ],
        },

        // {
        //   title: "Programs",
        //   path: siteRoutes.programListing,
        //   active: "programs",
        //   permission: sitePermissions.programListing,
        //   subPagesPermissions: [
        //     sitePermissions.programListing,
        //     sitePermissions.createProgram,
        //   ],
        // },

        {
          title: "Admins",
          path: siteRoutes.superAdminManagementListing,
          active: "super-admin-management",
          permission: sitePermissions.superAdminManagementListing,
          subPagesPermissions: [sitePermissions.superAdminManagementListing],
        },
        {
          title: "Role Management",
          path: siteRoutes.superRoleManagementListing,
          active: "super-role-management",
          permission: sitePermissions.superRoleManagementListing,
          subPagesPermissions: [sitePermissions.superRoleManagementListing],
        },
        {
          title: "Permission Management",
          path: siteRoutes.permissionManagementListing,
          active: "permission-management",
          permission: sitePermissions.permissionManagementListing,
          subPagesPermissions: [sitePermissions.permissionManagementListing],
        },
        {
          title: "Module Management",
          path: siteRoutes.moduleManagement,
          active: "module-management",
          permission: sitePermissions.moduleManagement,
          subPagesPermissions: [sitePermissions.moduleManagement],
        },
        {
          title: "Certificate Levels",
          path: siteRoutes.certificateLevelList,
          active: "certificate-level-management",
          permission: sitePermissions.CertificateLevelList,
          subPagesPermissions: [sitePermissions.CertificateLevelList],
        },
        // {
        //     title: "Linked Program",
        //     path: siteRoutes.linkedProgramEntryTestListing,
        //     active: "linked-program",
        //     permission: sitePermissions.linkedProgramEntryTestListing,
        //     subPagesPermissions: [
        //         sitePermissions.moduleManagement,

        //     ]
        // },
        {
          title: "Academic Session",
          path: siteRoutes.academicSessionOrganizationListing,
          active: "academic-session-organization",
          permission: sitePermissions.academicSessionOrganizationListing,
          subPagesPermissions: [
            sitePermissions.academicSessionOrganizationListing,
          ],
        },
      ],
      isDropdownOpen: false,
    },
    {
      title: "Admissions",
      path: splitPathBySlash(siteRoutes.admissionCampaignListing)[2],
      subMenus: [
        {
          title: "Admission Campaigns",
          path: siteRoutes.admissionCampaignListing,
          active: splitPathBySlash(siteRoutes.admissionCampaignListing)[3],
          permission: sitePermissions.admissionCampaignListing,
          subPagesPermissions: [
            sitePermissions.createAdmissionCampaign,
            sitePermissions.admissionCampaignListing,
          ],
        },
        {
          title: "Admission Session",
          path: siteRoutes.admissionSessionListing,
          active: splitPathBySlash(siteRoutes.admissionSessionListing)[3],
          permission: sitePermissions.admissionSessionListing,
          subPagesPermissions: [
            sitePermissions.createAdmissionSession,
            sitePermissions.admissionSessionListing,
          ],
        },
        {
          title: "Students Applications",
          path: siteRoutes.admissionStudentListing,
          active: splitPathBySlash(siteRoutes.admissionStudentListing)[3],
          permission: sitePermissions.admissionStudentListing,
          subPagesPermissions: [sitePermissions.admissionStudentListing],
        },
        {
          title: "Student applications view only",
          path: siteRoutes.admissionApplicantsListing,
          active: splitPathBySlash(siteRoutes.admissionApplicantsListing)[3],
          permission: sitePermissions.admissionApplicantsListing,
          subPagesPermissions: [sitePermissions.admissionApplicantsListing],
        },

        {
          title: "Test Types",
          path: siteRoutes.admissionTestTypesListing,
          active: splitPathBySlash(siteRoutes.admissionTestTypesListing)[3],
          permission: sitePermissions.admissionTestTypesListing,
          subPagesPermissions: [
            sitePermissions.admissionTestTypesListing,
            sitePermissions.createAdmissionTestType,
          ],
        },
        {
          title: "Registered Students",
          path: siteRoutes.studentRegListing,
          active: splitPathBySlash(siteRoutes.studentRegListing)[3],
          permission: sitePermissions.studentRegListing,
          subPagesPermissions: [sitePermissions.studentRegListing],
        },

        {
          title: "Offer Letter Templates",
          path: siteRoutes.admissionOfferLetterListing,
          active: splitPathBySlash(siteRoutes.admissionOfferLetterListing)[3],
          permission: sitePermissions.admissionOfferLetterListing,
          subPagesPermissions: [
            sitePermissions.admissionOfferLetterListing,
            sitePermissions.createAdmissionOfferLetter,
          ],
        },
        // {
        //     title: "Board Management",
        //     path: siteRoutes.editAdmissionBoard,
        // active: splitPathBySlash(siteRoutes.editAdmissionBoard)[2],
        //     permission: sitePermissions.editAdmissionBoard,
        //     subPagesPermissions: [
        //         sitePermissions.editAdmissionBoard
        //     ]
        // },
        // {
        //     title: "Certificate Management",
        //     path: siteRoutes.editAdmissionCertificate,
        // active: splitPathBySlash(siteRoutes.editAdmissionCertificate)[2],
        //     permission: sitePermissions.editAdmissionCertificate,
        //     subPagesPermissions: [
        //         sitePermissions.editAdmissionCertificate
        //     ]
        // },
        {
          title: "Documents Master",
          path: siteRoutes.admissionManageDocumentsMasterListing,
          active: splitPathBySlash(
            siteRoutes.admissionManageDocumentsMasterListing
          )[3],
          permission: sitePermissions.admissionManageDocumentsMasterListing,
          subPagesPermissions: [
            sitePermissions.admissionManageDocumentsMasterListing,
          ],
        },
        {
          title: "Eligibility Templates Header",
          path: siteRoutes.admissioneligibilityTemplateHeadersListing,
          active: splitPathBySlash(
            siteRoutes.admissioneligibilityTemplateHeadersListing
          )[3],
          permission:
            sitePermissions.admissioneligibilityTemplateHeadersListing,
          subPagesPermissions: [
            sitePermissions.admissioneligibilityTemplateHeadersListing,
            sitePermissions.createAdmissioneligibilityTemplateHeaders,
          ],
        },

        {
          title: "Merit List",
          path: siteRoutes.admissionMeritListing,
          active: splitPathBySlash(siteRoutes.admissionMeritListing)[3],
          permission: sitePermissions.admissionMeritListing,
          subPagesPermissions: [sitePermissions.admissionMeritListing],
        },
        {
          title: "Merit Keys",
          path: siteRoutes.meritKeysListing,
          active: splitPathBySlash(siteRoutes.meritKeysListing)[3],
          permission: sitePermissions.meritKeysListing,
          subPagesPermissions: [
            sitePermissions.meritKeysListing,
            sitePermissions.createMeitKeys,
          ],
        },
        {
          title: "Merit List Formula",
          path: siteRoutes.meritListFormulaListing,
          active: splitPathBySlash(siteRoutes.meritListFormulaListing)[3],
          permission: sitePermissions.meritListFormulaListing,
          subPagesPermissions: [
            sitePermissions.meritKeysListing,
            sitePermissions.createMeitKeys,
          ],
        },
        {
          title: "Manage Merit List",
          path: siteRoutes.manageMeritListListing,
          active: splitPathBySlash(siteRoutes.manageMeritListListing)[3],
          permission: sitePermissions.manageMeritListListing,
          subPagesPermissions: [
            sitePermissions.manageMeritListListing,
            sitePermissions.manageMeritListListing,
          ],
        },

        {
          title: "Quotas List",
          path: siteRoutes.quotasAdmissionListing,
          active: splitPathBySlash(siteRoutes.quotasAdmissionListing)[3],
          permission: sitePermissions.quotasAdmissionListing,
          subPagesPermissions: [
            sitePermissions.quotasAdmissionListing,
            sitePermissions.quotasAdmissionListing,
          ],
        },
        {
          title: "Manage Quotas",
          path: siteRoutes.admissionQuotasListing,
          active: splitPathBySlash(siteRoutes.admissionQuotasListing)[3],
          permission: sitePermissions.admissionQuotasListing,
          subPagesPermissions: [
            sitePermissions.admissionQuotasListing,
            sitePermissions.createAdmissionQuotas,
          ],
        },
        {
          title: "Manage Document",
          path: siteRoutes.admissionDocumentListing,
          active: splitPathBySlash(siteRoutes.admissionDocumentListing)[3],
          permission: sitePermissions.admissionDocumentListing,
          subPagesPermissions: [
            sitePermissions.admissionDocumentListing,
            sitePermissions.editAdmissionDocument,
          ],
        },

        {
          title: "Manage Subjects",
          path: siteRoutes.admissionSubjectManagementListing,
          active: splitPathBySlash(
            siteRoutes.admissionSubjectManagementListing
          )[3],
          permission: sitePermissions.admissionSubjectManagementListing,
          subPagesPermissions: [
            sitePermissions.admissionSubjectManagementListing,
            sitePermissions.createAdmissionSubjectManagement,
          ],
        },
        {
          title: "Manage Boards/Universities",
          path: siteRoutes.admissionBoardManagementListing,
          active: splitPathBySlash(
            siteRoutes.admissionBoardManagementListing
          )[3],
          permission: sitePermissions.admissionBoardManagementListing,
          subPagesPermissions: [
            sitePermissions.admissionBoardManagementListing,
            sitePermissions.createAdmissionBoardManagement,
          ],
        },
        {
          title: "Manage Certificate/Degree",
          path: siteRoutes.admissionCertificatemanagementListing,
          active: splitPathBySlash(
            siteRoutes.admissionCertificatemanagementListing
          )[3],
          permission: sitePermissions.admissionCertificateManagementListing,
          subPagesPermissions: [
            sitePermissions.admissionCertificateManagementListing,
            sitePermissions.createAdmissionCertificateManagement,
          ],
        },
      ],
      icon: GraduationSvg,
      isDropdownOpen: false,
    },
    {
      title: "HR Management",
      path: splitPathBySlash(siteRoutes.hrManagementLeaveDashboard)[2],
      subMenus: [
        {
          title: "Leave Dashboard",
          path: siteRoutes.hrManagementLeaveDashboard,
          active: splitPathBySlash(siteRoutes.hrManagementLeaveDashboard)[3],
          permission: sitePermissions.hrManagementLeaveDashboard,
          subPagesPermissions: [sitePermissions.hrManagementLeaveDashboard],
        },
        {
          title: "Overtime Slots",
          path: siteRoutes.overtimeSlotsListing,
          active: splitPathBySlash(siteRoutes.overtimeSlotsListing)[3],
          permission: sitePermissions.overtimeSlotsListing,
          subPagesPermissions: [
            sitePermissions.overtimeSlotsListing,
            sitePermissions.createOvertimeSlot,
          ],
        },
        {
          title: "Absent Employees",
          path: siteRoutes.absentEmployeesListing,
          active: splitPathBySlash(siteRoutes.absentEmployeesListing)[3],
          permission: sitePermissions.absentEmployeesListing,
          subPagesPermissions: [sitePermissions.absentEmployeesListing],
        },
        {
          title: "Leave Cancellation",
          path: siteRoutes.leaveCancellationListing,
          active: splitPathBySlash(siteRoutes.leaveCancellationListing)[3],
          permission: sitePermissions.leaveCancellationListing,
          subPagesPermissions: [sitePermissions.leaveCancellationListing],
        },
        {
          title: "Release Balance",
          path: siteRoutes.releasedLeaveBalancingReportListing,
          active: splitPathBySlash(
            siteRoutes.releasedLeaveBalancingReportListing
          )[3],
          permission: sitePermissions.releasedLeaveBalancingReportListing,
          subPagesPermissions: [
            sitePermissions.releasedLeaveBalancingReportListing,
          ],
        },
        {
          title: "Remuneration",
          path: siteRoutes.remunerationListing,
          active: splitPathBySlash(siteRoutes.remunerationListing)[3],
          permission: sitePermissions.remunerationListing,
          subPagesPermissions: [sitePermissions.remunerationListing],
        },
        {
          title: "Overtime Manual Entry",
          path: siteRoutes.overtimeManualEntryListing,
          active: splitPathBySlash(siteRoutes.overtimeManualEntryListing)[3],
          permission: sitePermissions.overtimeManualEntryListing,
          subPagesPermissions: [sitePermissions.overtimeManualEntryListing],
        },
        {
          title: "Remuneration Settings",
          path: siteRoutes.remunerationSettingsListing,
          active: splitPathBySlash(siteRoutes.remunerationSettingsListing)[3],
          permission: sitePermissions.remunerationSettingsListing,
          subPagesPermissions: [sitePermissions.remunerationSettingsListing],
        },
        {
          title: "Employees Overtime",
          path: siteRoutes.employeesOvertimeListing,
          active: splitPathBySlash(siteRoutes.employeesOvertimeListing)[3],
          permission: sitePermissions.employeesOvertimeListing,
          subPagesPermissions: [sitePermissions.employeesOvertimeListing],
        },
        {
          title: "Requested Leaves",
          path: siteRoutes.requestedLeavesListing,
          active: splitPathBySlash(siteRoutes.requestedLeavesListing)[3],
          permission: sitePermissions.requestedLeavesListing,
          subPagesPermissions: [sitePermissions.requestedLeavesListing],
        },
        {
          title: "My Attendance",
          path: siteRoutes.myAttendanceList,
          active: splitPathBySlash(siteRoutes.myAttendanceList)[3],
          permission: sitePermissions.myAttendanceList,
          subPagesPermissions: [sitePermissions.myAttendanceList],
        },
        {
          title: "Leave Types",
          path: siteRoutes.leaveTypeListing,
          active: splitPathBySlash(siteRoutes.leaveTypeListing)[3],
          permission: sitePermissions.leaveTypeListing,
          subPagesPermissions: [
            sitePermissions.leaveTypeListing,
            sitePermissions.createLeaveTypes,
          ],
        },
        {
          title: "Set Off Days",
          path: siteRoutes.setOffDays,
          active: splitPathBySlash(siteRoutes.setOffDays)[3],
          permission: sitePermissions.setOffDays,
          subPagesPermissions: [sitePermissions.setOffDays],
        },
        {
          title: "Request Details",
          path: siteRoutes.requestDetails,
          active: splitPathBySlash(siteRoutes.requestDetails)[3],
          permission: sitePermissions.requestDetails,
          subPagesPermissions: [sitePermissions.requestDetails],
        },
        {
          title: "Set Holidays",
          path: siteRoutes.setHolidaysListing,
          active: splitPathBySlash(siteRoutes.setHolidaysListing)[3],
          permission: sitePermissions.setHolidaysListing,
          subPagesPermissions: [sitePermissions.setHolidaysListing],
        },
      ],
      icon: HRMangementSvg,
      isDropdownOpen: false,
    },
    {
      title: "Finance",
      path: splitPathBySlash(siteRoutes.financeDashboard)[2],
      subMenus: [
        {
          title: "Finance Dashboard",
          path: siteRoutes.financeDashboard,
          active: splitPathBySlash(siteRoutes.financeDashboard)[3],
          subPagesPermissions: [sitePermissions.financeDashboard],
          permission: sitePermissions.financeDashboard,
        },
        {
          title: "Student Financial Clearance",
          path: siteRoutes.studentFinancialClearanceListing,
          active: splitPathBySlash(
            siteRoutes.studentFinancialClearanceListing
          )[3],
          subPagesPermissions: [
            sitePermissions.studentFinancialClearanceListing,
          ],
          permission: sitePermissions.studentFinancialClearanceListing,
        },
        {
          title: "Check Challan Status",
          path: siteRoutes.checkFinancialChallanStatus,
          active: splitPathBySlash(siteRoutes.checkFinancialChallanStatus)[3],
          subPagesPermissions: [sitePermissions.checkFinancialChallanStatus],
          permission: sitePermissions.checkFinancialChallanStatus,
        },
        {
          title: "Template Programs Account",
          path: siteRoutes.templateProgramAccountCodeListing,
          active: splitPathBySlash(
            siteRoutes.templateProgramAccountCodeListing
          )[3],
          subPagesPermissions: [
            sitePermissions.templateProgramAccountCodeListing,
          ],
          permission: sitePermissions.templateProgramAccountCodeListing,
        },
        {
          title: "Fine slots",
          path: siteRoutes.fineSlotsListing,
          active: splitPathBySlash(siteRoutes.fineSlotsListing)[3],
          subPagesPermissions: [
            sitePermissions.fineSlotsListing,
            sitePermissions.createFineSlot,
          ],
          permission: sitePermissions.fineSlotsListing,
        },
        {
          title: "Voucher Types",
          path: siteRoutes.voucherTypesListing,
          active: splitPathBySlash(siteRoutes.voucherTypesListing)[3],
          subPagesPermissions: [
            sitePermissions.voucherTypesListing,
            sitePermissions.createVoucherType,
          ],
          permission: sitePermissions.voucherTypesListing,
        },
        {
          title: "Voucher Particulars",
          path: siteRoutes.voucherParticularListing,
          active: splitPathBySlash(siteRoutes.voucherParticularListing)[3],
          subPagesPermissions: [
            sitePermissions.voucherParticularListing,
            sitePermissions.createVoucherParticular,
          ],
          permission: sitePermissions.voucherParticularListing,
        },
        {
          title: "Voucher Template Header",
          path: siteRoutes.voucherTemplateHeaderListing,
          active: splitPathBySlash(siteRoutes.voucherTemplateHeaderListing)[3],
          subPagesPermissions: [
            sitePermissions.voucherTemplateHeaderListing,
            sitePermissions.createVoucherTemplateHeader,
          ],
          permission: sitePermissions.voucherTemplateHeaderListing,
        },
        {
          title: "Master Book",
          path: siteRoutes.masterBookListing,
          active: splitPathBySlash(siteRoutes.masterBookListing)[3],
          permission: sitePermissions.masterBookListing,
          subPagesPermissions: [
            sitePermissions.masterBookListing,
            sitePermissions.masterBookTransactionDetail,
            sitePermissions.showMasterBookTransactionDetail,
          ],
        },
        {
          title: "Applications",
          path: siteRoutes.financeApplicationsListing,
          active: splitPathBySlash(siteRoutes.financeApplicationsListing)[3],
          subPagesPermissions: [
            sitePermissions.financeApplicationsListing,
            sitePermissions.createFinanceApplications,
          ],
          permission: sitePermissions.financeApplicationsListing,
        },
        {
          title: "Application Templates",
          path: siteRoutes.applicationTemplateLinkListing,
          active: splitPathBySlash(
            siteRoutes.applicationTemplateLinkListing
          )[3],
          subPagesPermissions: [
            sitePermissions.applicationTemplateLinkListing,
            sitePermissions.createApplicationTemplateLink,
          ],
          permission: sitePermissions.applicationTemplateLinkListing,
        },
        {
          title: "Banks List",
          path: siteRoutes.banksListing,
          active: splitPathBySlash(siteRoutes.banksListing)[3],
          subPagesPermissions: [
            sitePermissions.banksListing,
            sitePermissions.createBank,
          ],
          permission: sitePermissions.banksListing,
        },
        {
          title: "Bank Transactions Logs",
          path: siteRoutes.bankTransactionLogsListing,
          active: splitPathBySlash(siteRoutes.bankTransactionLogsListing)[3],
          subPagesPermissions: [sitePermissions.bankTransactionLogsListing],
          permission: sitePermissions.bankTransactionLogsListing,
        },
        {
          title: "Bank Scroll Logs",
          path: siteRoutes.bankScrollLogsListing,
          active: splitPathBySlash(siteRoutes.bankScrollLogsListing)[3],
          subPagesPermissions: [sitePermissions.bankScrollLogsListing],
          permission: sitePermissions.bankScrollLogsListing,
        },
      ],
      icon: FinanceSvg,
      isDropdownOpen: false,
    },
    {
      title: "Infrastructure & Asset Management",
      path: splitPathBySlash(siteRoutes.assetsListing)[3],
      subMenus: [
        {
          title: "Asset Management",
          path: siteRoutes.assetsListing,
          active: "assets-management",
          permission: sitePermissions.assetListing,
          subPagesPermissions: [
            sitePermissions.assetListing,
            sitePermissions.createAsset,
          ],
        },
        {
          title: "Building Managament",
          path: siteRoutes.buildingListing,
          active: "buildings-management",
          permission: sitePermissions.buildingListing,
          subPagesPermissions: [
            sitePermissions.buildingListing,
            sitePermissions.createBuilding,
          ],
        },
      ],
      icon: AdministrationSvg,
      isDropdownOpen: false,
    },
    {
      title: "Hostel",
      path: "hostel",
      subMenus: [
        {
          title: "Hostel Management",
          path: siteRoutes.hostelListing,
          active: "hostel-management",
          permission: sitePermissions.hostelListing,
          subPagesPermissions: [
            sitePermissions.hostelListing,
            sitePermissions.createHostel,
          ],
        },
        {
          title: "Hostel Room Management",
          path: siteRoutes.hostelRoomsListing,
          active: "hostel-rooms-management",
          permission: sitePermissions.hostelRoomsListing,
          subPagesPermissions: [
            sitePermissions.hostelRoomsListing,
            sitePermissions.createHostelRoom,
          ],
        },
        {
          title: "Applicant Management",
          path: siteRoutes.applicantListing,
          active: "applicants-management",
          permission: sitePermissions.applicantListing,
          subPagesPermissions: [
            sitePermissions.applicantListing,
            sitePermissions.createApplicant,
          ],
        },
        {
          title: "Merit Management",
          path: siteRoutes.hostelMeritListing,
          active: "merit-management",
          permission: sitePermissions.hostelMeritListing,
          subPagesPermissions: [
            sitePermissions.hostelMeritListing,
            sitePermissions.createHostelMerit,
          ],
        },
        {
          title: "Sessions Management",
          path: siteRoutes.hostelSessionListing,
          active: "session-management",
          permission: sitePermissions.hostelSessionListing,
          subPagesPermissions: [
            sitePermissions.hostelSessionListing,
            sitePermissions.createHostelSession,
          ],
        },
        {
          title: "Finance Management",
          path: siteRoutes.hostelFinanceManagement,
          active: "finance-management",
          permission: sitePermissions.hostelFinanceManagement,
          subPagesPermissions: [sitePermissions.hostelFinanceManagement],
        },
        {
          title: "Applied Applicants",
          path: siteRoutes.appliedApplicant,
          active: "applied-applicant-management",
          permission: sitePermissions.appliedApplicant,
          subPagesPermissions: [sitePermissions.appliedApplicant],
        },
        {
          title: "Applicant Enrollment",
          path: siteRoutes.applicantEnrollment,
          active: "applicant-enrollment-management",
          permission: sitePermissions.applicantEnrollment,
          subPagesPermissions: [sitePermissions.applicantEnrollment],
        },
        {
          title: "Registered Applicant",
          path: siteRoutes.registeredApplicant,
          active: "registered-applicant-management",
          permission: sitePermissions.registeredApplicantList,
          subPagesPermissions: [sitePermissions.registeredApplicantList],
        },
        {
          title: "Hostel Applicant Merit List",
          path: siteRoutes.hostelApplicantMeritList,
          active: "hostel-applicant-merit-list-management",
          permission: sitePermissions.hostelApplicantMeritList,
          subPagesPermissions: [sitePermissions.hostelApplicantMeritList],
        },
      ],
      icon: GraduationSvg,
      isDropdownOpen: false,
    },

    //admin-career
    {
      title: "Careers",
      path: splitPathBySlash(siteRoutes.careerDesignationListing)[2],

      permission: sitePermissions.careerDesignationListing,

      subMenus: [
        {
          title: "Designation",
          path: siteRoutes.careerDesignationListing,
          active: "designation-management",
          permission: sitePermissions.careerDesignationListing,
          subPagesPermissions: [
            sitePermissions.careerDesignationListing,
            sitePermissions.createCareerDesignation,
          ],
        },
        {
          title: "Advertisement",
          path: siteRoutes.careerAdvertisementListing,
          active: "advertisement-management",
          permission: sitePermissions.careerAdvertisementListing,
          subPagesPermissions: [sitePermissions.careerAdvertisementListing],
        },
        {
          title: "Post Template",
          path: siteRoutes.careerPostTemplateListing,
          active: "post-template-management",
          permission: sitePermissions.careerPostTemplateListing,
          subPagesPermissions: [sitePermissions.createCareerPostTemplate],
        },
        {
          title: "Post",
          path: siteRoutes.careerPostListing,
          active: "post-management",
          permission: sitePermissions.careerPostListing,
          subPagesPermissions: [sitePermissions.careerPostListing],
        },
        {
          title: "Applicant",
          path: siteRoutes.careerApplicantListing,
          active: "applicant-management",
          permission: sitePermissions.careerApplicantListing,
          subPagesPermissions: [sitePermissions.careerApplicantListing],
        },
      ],
      icon: CareerSvg,
      isDropdownOpen: false,
    },
    {
      title: "Eportal Home",
      path: splitPathBySlash(siteRoutes.ePortalDashboard)[3],
      subMenus: [],
      icon: HomeSvg,
      link: siteRoutes.ePortalDashboard,
      isDropdownOpen: false,
      permission: sitePermissions.ePortalDashboard,
    },
    {
      title: "My Profile",
      path: splitPathBySlash(siteRoutes.viewEportalProfile)[3],
      subMenus: [],
      icon: ProfileSvg,
      link: siteRoutes.viewEportalProfile,
      isDropdownOpen: false,
      permission: sitePermissions.viewEportalProfile,
    },
    {
      title: "Generate Challan",
      path: splitPathBySlash(siteRoutes.ePortalChallanListing)[3],
      subMenus: [],
      icon: ChallanSvg,
      link: siteRoutes.ePortalChallanListing,
      permission: sitePermissions.ePortalChallanListing,
      isDropdownOpen: false,
    },
    {
      title: "My Vouchers",
      path: splitPathBySlash(siteRoutes.ePortalMyVouchers)[3],
      subMenus: [],
      icon: VoucherSvg,
      link: "",
      permission: sitePermissions.ePortalMyVouchers,
      isDropdownOpen: false,
    },

    // eportal-career
    {
      title: "Careers",
      path: splitPathBySlash(siteRoutes.eportalCareersListing)[3],

      subMenus: [
        {
          title: "Profile",
          path: siteRoutes.eportalCarrerProfile,
          active: "career-profile",
          permission: sitePermissions.eportalCarrerProfile,
          subPagesPermissions: [
            sitePermissions.eportalCarrerProfile,
            sitePermissions.eportalCarrerProfile,
          ],
        },
        {
          title: "Applied Jobs",
          path: siteRoutes.eportalAppliedJobListing,
          active: "e-portal-jobs",
          permission: sitePermissions.eportalAppliedJobListing,
          subPagesPermissions: [
            sitePermissions.eportalAppliedJobListing,
            sitePermissions.eportalAppliedJobListing,
          ],
        },
        {
          title: "Jobs",
          path: siteRoutes.eportalCareersListing,
          active: "e-portal-career",
          permission: sitePermissions.eportalCareersListing,
          subPagesPermissions: [
            sitePermissions.eportalCareersListing,
            sitePermissions.createEportalCareer,
          ],
        },
      ],
      icon: CareerSvg,

      isDropdownOpen: false,
    },
    {
      title: "Admissions",
      path: splitPathBySlash(siteRoutes.eportalAdmissionsListing)[3],
      subMenus: [],
      icon: AdmissionSvg,
      link: siteRoutes.eportalAdmissionsListing,
      permission: sitePermissions.eportalAdmissionsListing,
      isDropdownOpen: false,
    },
    {
      title: "Testing Services",
      path: splitPathBySlash(siteRoutes.ePortalDashboard)[3],
      subMenus: [],
      icon: TestingSvg,
      link: "",
      permission: sitePermissions.eportalTestingServiceListing,
      isDropdownOpen: false,
    },
    {
      title: "Hostel",
      path: splitPathBySlash(siteRoutes.eportalHostelPortal)[3],
      subMenus: [],
      icon: HostelSvg,
      link: siteRoutes.eportalHostelPortal,
      permission: sitePermissions.eportalHostelPortal,
      isDropdownOpen: false,
    },
    {
      title: "Short Courses",
      path: splitPathBySlash(siteRoutes.ePortalShortCoursesListing)[3],
      subMenus: [],
      icon: SideShortCoursesSvg,
      link: siteRoutes.ePortalShortCoursesListing,
      permission: sitePermissions.ePortalShortCoursesListing,
      isDropdownOpen: false,
    },
    {
      title: "Academics",
      path: "academics",
      subMenus: [
        {
          title: "Sessions Management",
          path: siteRoutes.academicSessionListing,
          active: splitPathBySlash(siteRoutes.academicSessionListing)[3],
          permission: sitePermissions.academicSessionListing,
          subPagesPermissions: [
            sitePermissions.academicSessionListing,
            sitePermissions.academicSessionManagementListing,
            sitePermissions.academicCourseListing,
            sitePermissions.createAcademicCourse,
          ],
        },
        {
          title: "Enrollments",
          path: siteRoutes.academicEnrollmentsListing,
          active: splitPathBySlash(siteRoutes.academicEnrollmentsListing)[3],
          permission: sitePermissions.academicEnrollmentsListing,
          subPagesPermissions: [sitePermissions.academicEnrollmentsListing],
        },
        {
          title: "Teachers Titles",
          path: siteRoutes.teachersTitlesListing,
          active: splitPathBySlash(siteRoutes.teachersTitlesListing)[3],
          permission: sitePermissions.teachersTitlesListing,
          subPagesPermissions: [
            sitePermissions.teachersTitlesListing,
            sitePermissions.createTeachersTitle,
          ],
        },
        {
          title: "Course types",
          path: siteRoutes.courseTypesListing,
          active: splitPathBySlash(siteRoutes.courseTypesListing)[3],
          permission: sitePermissions.courseTypesListing,
          subPagesPermissions: [
            sitePermissions.courseTypesListing,
            sitePermissions.createCourseType,
          ],
        },
        {
          title: "Common Courses Pools",
          path: siteRoutes.commonCoursesPoolsListing,
          active: splitPathBySlash(siteRoutes.commonCoursesPoolsListing)[3],
          permission: sitePermissions.commonCoursesPoolsListing,
          subPagesPermissions: [
            sitePermissions.commonCoursesPoolsListing,
            sitePermissions.createCommonCoursesPools,
          ],
        },
        {
          title: "Approved & Receipt",
          path: siteRoutes.approvedReceiptAcknowledgedListing,
          active: splitPathBySlash(
            siteRoutes.approvedReceiptAcknowledgedListing
          )[3],
          permission: sitePermissions.approvedReceiptAcknowledgedListing,
          subPagesPermissions: [
            sitePermissions.approvedReceiptAcknowledgedListing,
            sitePermissions.appRecAckViewAwardList,
          ],
        },
        {
          title: "Consolidated Results",
          path: siteRoutes.consolidatedResultsListing,
          active: splitPathBySlash(siteRoutes.consolidatedResultsListing)[3],
          permission: sitePermissions.consolidatedResultsListing,
          subPagesPermissions: [sitePermissions.consolidatedResultsListing],
        },
        {
          title: "Finance Academic Sessions",
          path: siteRoutes.financeAcademicSessionListing,
          active: splitPathBySlash(siteRoutes.financeAcademicSessionListing)[3],
          permission: sitePermissions.financeAcademicSessionListing,
          subPagesPermissions: [
            sitePermissions.financeAcademicSessionListing,
            sitePermissions.createFinanceAcademicSession,
          ],
        },
        {
          title: "Students",
          path: siteRoutes.academicStudent,
          active: splitPathBySlash(siteRoutes.academicStudent)[3],
          permission: sitePermissions.academicStudent,
          subPagesPermissions: [
            sitePermissions.academicStudent,
            sitePermissions.academicStudent,
          ],
        },
        {
          title: "Students Fine",
          path: siteRoutes.academicStudentFine,
          active: splitPathBySlash(siteRoutes.academicStudentFine)[3],
          permission: sitePermissions.academicStudentFine,
          subPagesPermissions: [
            sitePermissions.academicStudentFine,
            sitePermissions.academicStudentFine,
          ],
        },
        {
          title: "Students List",
          path: siteRoutes.academicDefaulterStudent,
          active: splitPathBySlash(siteRoutes.academicDefaulterStudent)[3],
          permission: sitePermissions.academicDefaulterStudent,
          subPagesPermissions: [
            sitePermissions.academicDefaulterStudent,
            sitePermissions.academicDefaulterStudent,
          ],
        },
        {
          title: "Fee Types",
          path: siteRoutes.academicFeeTypeListing,
          active: splitPathBySlash(siteRoutes.academicFeeTypeListing)[3],
          permission: sitePermissions.academicFeeTypeListing,
          subPagesPermissions: [
            sitePermissions.academicFeeTypeListing,
            sitePermissions.createAcademicFeeType,
          ],
        },
        {
          title: "Fee Plans",
          path: siteRoutes.academicFeePlansListing,
          active: splitPathBySlash(siteRoutes.academicFeePlansListing)[3],
          permission: sitePermissions.academicFeePlansListing,
          subPagesPermissions: [
            sitePermissions.academicFeePlansListing,
            sitePermissions.createAcademicFeePlan,
          ],
        },
        {
          title: "Fee Transactions",
          path: siteRoutes.academicFeeTransactionsListing,
          active: splitPathBySlash(
            siteRoutes.academicFeeTransactionsListing
          )[3],
          permission: sitePermissions.academicFeeTransactionsListing,
          subPagesPermissions: [
            sitePermissions.academicFeeTransactionsListing,
            sitePermissions.createAcademicFeeReceipt,
          ],
        },
        {
          title: "Paid Vouchers",
          path: siteRoutes.academicPaidVouchersListing,
          active: splitPathBySlash(siteRoutes.academicPaidVouchersListing)[3],
          permission: sitePermissions.academicPaidVouchersListing,
          subPagesPermissions: [sitePermissions.academicPaidVouchersListing],
        },
        {
          title: "Exam Types",
          path: siteRoutes.academicExamTypeListing,
          active: splitPathBySlash(siteRoutes.academicExamTypeListing)[3],
          permission: sitePermissions.academicExamTypeListing,
          subPagesPermissions: [
            sitePermissions.academicExamTypeListing,
            sitePermissions.createAcademicExamType,
          ],
        },
        {
          title: "Student Clearence",
          path: siteRoutes.academicStudentClearence,
          active: splitPathBySlash(siteRoutes.academicStudentClearence)[3],
          permission: sitePermissions.academicStudentClearence,
          subPagesPermissions: [sitePermissions.academicStudentClearence],
        },
        {
          title: "Exams",
          path: siteRoutes.academicExamsListing,
          active: splitPathBySlash(siteRoutes.academicExamsListing)[3],
          permission: sitePermissions.academicExamsListing,
          subPagesPermissions: [
            sitePermissions.academicExamsListing,
            sitePermissions.createAcademicExam,
          ],
        },
        {
          title: "Programs",
          path: siteRoutes.programListing,
          active: "programs",
          permission: sitePermissions.programListing,
          subPagesPermissions: [
            sitePermissions.programListing,
            sitePermissions.createProgram,
          ],
        },
        {
          title: "Invigilators",
          path: siteRoutes.academicInvigilatorsListing,
          active: splitPathBySlash(siteRoutes.academicInvigilatorsListing)[3],
          permission: sitePermissions.academicInvigilatorsListing,
          subPagesPermissions: [
            sitePermissions.academicInvigilatorsListing,
            sitePermissions.createAcademicInvigilator,
          ],
        },
        {
          title: "Authorities",
          path: siteRoutes.academicAuthorityListing,
          active: splitPathBySlash(siteRoutes.academicAuthorityListing)[3],
          permission: sitePermissions.academicAuthorityListing,
          subPagesPermissions: [
            sitePermissions.academicAuthorityListing,
            sitePermissions.createAcademicAuthority,
          ],
        },
        {
          title: "Grade Templates",
          path: siteRoutes.academicGradeTemplatesListing,
          active: splitPathBySlash(siteRoutes.academicGradeTemplatesListing)[3],
          permission: sitePermissions.academicGradeTemplatesListing,
          subPagesPermissions: [
            sitePermissions.academicGradeTemplatesListing,
            sitePermissions.createAcademicGradeTemplate,
          ],
        },
        {
          title: "Academic Status",
          path: siteRoutes.academicStatusListing,
          active: splitPathBySlash(siteRoutes.academicStatusListing)[3],
          permission: sitePermissions.academicStatusListing,
          subPagesPermissions: [
            sitePermissions.academicStatusListing,
            sitePermissions.createAcademicStatus,
          ],
        },
        {
          title: "Clearance Authorities",
          path: siteRoutes.clearanceAuthoritiesListing,
          active: splitPathBySlash(siteRoutes.clearanceAuthoritiesListing)[3],
          permission: sitePermissions.clearanceAuthoritiesListing,
          subPagesPermissions: [
            sitePermissions.clearanceAuthoritiesListing,
            sitePermissions.createClearanceAuthority,
          ],
        },
        {
          title: "Student Status",
          path: siteRoutes.studentStatusListing,
          active: splitPathBySlash(siteRoutes.studentStatusListing)[3],
          permission: sitePermissions.studentStatusListing,
          subPagesPermissions: [
            sitePermissions.studentStatusListing,
            sitePermissions.createStudentStatus,
          ],
        },
        {
          title: "Student Group",
          path: siteRoutes.studentGroupListing,
          active: splitPathBySlash(siteRoutes.studentGroupListing)[3],
          permission: sitePermissions.studentGroupListing,
          subPagesPermissions: [
            sitePermissions.studentGroupListing,
            sitePermissions.createStudentGroup,
          ],
        },
        {
          title: "Student Specialization",
          path: siteRoutes.studentSpecializationsListing,
          active: splitPathBySlash(siteRoutes.studentSpecializationsListing)[3],
          permission: sitePermissions.studentSpecializationsListing,
          subPagesPermissions: [
            sitePermissions.studentSpecializationsListing,
            sitePermissions.createStudentSpecialization,
          ],
        },
        {
          title: "Semester Types",
          path: siteRoutes.academicSemesterTypesListing,
          active: splitPathBySlash(siteRoutes.academicSemesterTypesListing)[3],
          permission: sitePermissions.academicSemesterTypesListing,
          subPagesPermissions: [
            sitePermissions.academicSemesterTypesListing,
            sitePermissions.createAcademicSemesterType,
          ],
        },
        {
          title: "Letter Grades",
          path: siteRoutes.academicLetterGradesListing,
          active: splitPathBySlash(siteRoutes.academicLetterGradesListing)[3],
          permission: sitePermissions.academicLetterGradesListing,
          subPagesPermissions: [
            sitePermissions.academicLetterGradesListing,
            sitePermissions.createAcademicLetterGrade,
          ],
        },
        {
          title: "Manage Sections",
          path: siteRoutes.academicSectionsListing,
          active: splitPathBySlash(siteRoutes.academicSectionsListing)[3],
          permission: sitePermissions.academicSectionsListing,
          subPagesPermissions: [
            sitePermissions.academicSectionsListing,
            sitePermissions.createAcademicSection,
          ],
        },
        {
          title: "Template Courses",
          path: siteRoutes.academicTemplateCoursesListing,
          active: splitPathBySlash(
            siteRoutes.academicTemplateCoursesListing
          )[3],
          permission: sitePermissions.academicTemplateCoursesListing,
          subPagesPermissions: [
            sitePermissions.academicTemplateCoursesListing,
            sitePermissions.createAcademicTemplateCourse,
          ],
        },
        {
          title: "Manage Internships",
          path: siteRoutes.academicInternshipsListing,
          active: splitPathBySlash(siteRoutes.academicInternshipsListing)[3],
          permission: sitePermissions.academicInternshipsListing,
          subPagesPermissions: [
            sitePermissions.academicInternshipsListing,
            sitePermissions.createAcademicInternship,
          ],
        },
        {
          title: "Exam Incharge",
          path: siteRoutes.academicManageExamIncharge,
          active: splitPathBySlash(siteRoutes.academicManageExamIncharge)[3],
          permission: sitePermissions.academicManageExamIncharge,
          subPagesPermissions: [
            sitePermissions.academicManageExamIncharge,
            sitePermissions.academicManageExamIncharge,
          ],
        },
        {
          title: "Student Clearence List",
          path: siteRoutes.studentClearenceListing,
          active: splitPathBySlash(siteRoutes.studentClearenceListing)[3],
          permission: sitePermissions.studentClearenceListing,
          subPagesPermissions: [sitePermissions.studentClearenceListing],
        },
        {
          title: "Plan of Studies",
          path: siteRoutes.academicPlanofStudies,
          active: splitPathBySlash(siteRoutes.academicPlanofStudies)[3],
          permission: sitePermissions.academicPlanofStudies,
          subPagesPermissions: [
            sitePermissions.academicPlanofStudies,
            sitePermissions.createStudyPlans,
          ],
        },
      ],
      icon: BooksSvg,
      isDropdownOpen: false,
    },

    {
      title: "Manage Merit List",
      path: "/manage-merit-list",
      subMenus: [],
      icon: MeritListSvg,
      isDropdownOpen: false,
    },
    {
      title: "Jobs Portal",
      path: "/manage-merit-list",
      subMenus: [],
      icon: JobsSvg,
      isDropdownOpen: false,
    },
    {
      title: "Short Courses",
      path: "/short-courses",
      subMenus: [],
      icon: CoursesSvg,
      isDropdownOpen: false,
    },
    {
      title: "My Privileges",
      path: "/my-privileges",
      subMenus: [],
      icon: PrivilegesSvg,
      isDropdownOpen: false,
    },
    {
      title: "Setting",
      path: "/settings",
      subMenus: [],
      icon: SettingsSolidSvg,
      isDropdownOpen: false,
    },
    {
      title: "System Administration",
      path: splitPathBySlash(siteRoutes.systemLogsListing)[3],
      subMenus: [
        {
          title: "Logs",
          path: siteRoutes.systemLogsListing,
          active: splitPathBySlash(siteRoutes.systemLogsListing)[3],
          permission: sitePermissions.systemLogsListing,
          subPagesPermissions: [sitePermissions.systemLogsListing],
        },
        {
          title: "Users",
          path: siteRoutes.systemUsersListing,
          active: splitPathBySlash(siteRoutes.systemUsersListing)[3],
          permission: sitePermissions.systemUsersListing,
          subPagesPermissions: [sitePermissions.systemUsersListing],
        },
        // {
        //   title: "Menus",
        //   path: siteRoutes.systemMenusListing,
        //   active: splitPathBySlash(siteRoutes.systemMenusListing)[3],
        //   permission: sitePermissions.systemMenusListing,
        //   subPagesPermissions: [sitePermissions.systemMenusListing],
        // },
        // {
        //   title: "Un-Registered Menus",
        //   path: siteRoutes.unregisteredMenusListing,
        //   active: splitPathBySlash(siteRoutes.unregisteredMenusListing)[3],
        //   permission: sitePermissions.unregisteredMenusListing,
        //   subPagesPermissions: [sitePermissions.unregisteredMenusListing],
        // },
        {
          title: "Role Management",
          path: siteRoutes.roleManagementListing,
          active: "roll-management",
          permission: sitePermissions.roleManagementListing,
          subPagesPermissions: [sitePermissions.roleManagementListing],
        },
        {
          title: "User Audit",
          path: siteRoutes.userAuditListing,
          active: splitPathBySlash(siteRoutes.userAuditListing)[3],
          permission: sitePermissions.userAuditListing,
          subPagesPermissions: [sitePermissions.userAuditListing],
        },
        {
          title: "WorkFlows",
          path: siteRoutes.workflowListing,
          active: splitPathBySlash(siteRoutes.workflowListing)[3],
          permission: sitePermissions.workflowListing,
          subPagesPermissions: [sitePermissions.workflowListing],
        },
      ],
      icon: AdministrationSvg,
      isDropdownOpen: false,
    },
    {
      title: "Testing Services",
      path: splitPathBySlash(siteRoutes.testingServicesDashboard)[2],
      subMenus: [
        {
          title: "Dashboard",
          path: siteRoutes.testingServicesDashboard,
          active: splitPathBySlash(siteRoutes.testingServicesDashboard)[3],
          permission: sitePermissions.testingServicesDashboard,
          subPagesPermissions: [sitePermissions.testingServicesDashboard],
        },
        {
          title: "Test Types",
          path: siteRoutes.testTypesListing,
          active: splitPathBySlash(siteRoutes.testTypesListing)[3],
          permission: sitePermissions.admissionTestTypesListing,
          subPagesPermissions: [
            sitePermissions.admissionTestTypesListing,
            sitePermissions.createAdmissionTestType,
          ],
        },
        {
          title: "Test Center",
          path: siteRoutes.TestingServicesTestCenterlist,
          active: splitPathBySlash(siteRoutes.TestingServicesTestCenterlist)[3],
          permission: sitePermissions.TestingServicesTestCenterlist,
          subPagesPermissions: [
            sitePermissions.TestingServicesTestCenterlist,
            sitePermissions.TestingServicesTestCentercreate,
          ],
        },
        {
          title: "Test Schedule",
          path: siteRoutes.TestingServicesTestSchedulelist,
          active: splitPathBySlash(
            siteRoutes.TestingServicesTestSchedulelist
          )[3],
          permission: sitePermissions.TestingServicesTestSchedulelist,
          subPagesPermissions: [
            sitePermissions.TestingServicesTestSchedulelist,
            sitePermissions.createTestingServicesTestSchedule,
          ],
        },
        {
          title: "Applicant List",
          path: siteRoutes.testingServicescandidatelisting,
          active: splitPathBySlash(
            siteRoutes.testingServicescandidatelisting
          )[3],
          permission: sitePermissions.testingServicescandidatelisting,
          subPagesPermissions: [
            sitePermissions.testingServicescandidatelisting,
            // sitePermissions.createTestingServicesTestSchedule,
          ],
        },
        {
          title: "Upload Result",
          path: siteRoutes.testingServicescandidateTestResultlist,
          active: splitPathBySlash(
            siteRoutes.testingServicescandidateTestResultlist
          )[3],
          permission: sitePermissions.testingServicescandidateTestResultlist,
          subPagesPermissions: [
            sitePermissions.testingServicescandidateTestResultlist,
          ],
        },
        {
          title: "Publish Results",
          path: siteRoutes.testingServicespublishresult,
          active: splitPathBySlash(siteRoutes.testingServicespublishresult)[3],
          permission: sitePermissions.testingServicespublishresult,
          subPagesPermissions: [sitePermissions.testingServicespublishresult],
        },
      ],
      icon: TestingServicesSvg,
      isDropdownOpen: false,
    },

    {
      title: "Authorities & Committees",
      path: splitPathBySlash(siteRoutes.authoritiesListing)[2],
      subMenus: [
        {
          title: "Authorities & Committees",
          path: siteRoutes.authoritiesListing,
          active: splitPathBySlash(siteRoutes.authoritiesListing)[3],
          permission: sitePermissions.authoritiesListing,
          subPagesPermissions: [sitePermissions.authoritiesListing],
        },
        // {
        //   title: "Senate Meetings",
        //   path: siteRoutes.senateMeetingList,
        //   active: splitPathBySlash(siteRoutes.senateMeetingList)[3],
        //   permission: sitePermissions.senateMeetingList,
        //   subPagesPermissions: [sitePermissions.senateMeetingList],
        // },
        // {
        //   title: "Academic Council Notifications",
        //   path: siteRoutes.councilNotificationsListing,
        //   active: splitPathBySlash(siteRoutes.councilNotificationsListing)[3],
        //   permission: sitePermissions.councilNotificationsListing,
        //   subPagesPermissions: [sitePermissions.councilNotificationsListing],
        // },
        {
          title: "Authority & Committee Member Types",
          path: siteRoutes.authorityMemberTypeListing,
          active: splitPathBySlash(siteRoutes.authorityMemberTypeListing)[3],
          permission: sitePermissions.authorityMemberTypeListing,
          subPagesPermissions: [sitePermissions.authorityMemberTypeListing],
        },
        {
          title: "Authority Boards",
          path: siteRoutes.authorityBoardsListing,
          active: splitPathBySlash(siteRoutes.authorityBoardsListing)[3],
          permission: sitePermissions.authorityBoardsListing,
          subPagesPermissions: [
            sitePermissions.authorityBoardsListing,
            sitePermissions.createAuthorityBoard,
          ],
        },
        {
          title: "Authority & Committee Types",
          path: siteRoutes.authorityTypeListing,
          active: splitPathBySlash(siteRoutes.authorityTypeListing)[3],
          permission: sitePermissions.authorityTypeListing,
          subPagesPermissions: [sitePermissions.authorityTypeListing],
        },
      ],
      icon: AuthoritiesSvg,
      isDropdownOpen: false,
    },
    {
      title: "QEC",
      path: splitPathBySlash(siteRoutes.reportCategoriesList)[2],
      subMenus: [
        {
          title: "Survey Reports",
          path: siteRoutes.qecSurveyReportlist,
          active: splitPathBySlash(siteRoutes.qecSurveyReportlist)[3],
          permission: sitePermissions.qecSurveyReportlist,
          subPagesPermissions: [sitePermissions.qecSurveyReportlist],
        },
        {
          title: "Report Categories",
          path: siteRoutes.reportCategoriesList,
          active: splitPathBySlash(siteRoutes.reportCategoriesList)[3],
          permission: sitePermissions.reportCategoriesList,
          subPagesPermissions: [sitePermissions.reportCategoriesList],
        },
        {
          title: "Manage Reports",
          path: siteRoutes.qecReportManagelist,
          active: splitPathBySlash(siteRoutes.qecReportManagelist)[3],
          permission: sitePermissions.qecReportManagelist,
          subPagesPermissions: [sitePermissions.qecReportManagelist],
        },
        {
          title: "Survey",
          path: siteRoutes.surveyListing,
          active: splitPathBySlash(siteRoutes.surveyListing)[3],
          permission: sitePermissions.surveyListing,
          subPagesPermissions: [sitePermissions.surveyListing],
        },

        {
          title: "Survey Types",
          path: siteRoutes.surveyTypeListing,
          active: splitPathBySlash(siteRoutes.surveyTypeListing)[3],
          permission: sitePermissions.surveyListing,
          subPagesPermissions: [sitePermissions.surveyTypeListing],
        },
        {
          title: "Question List",
          path: siteRoutes.questionListing,
          active: splitPathBySlash(siteRoutes.questionListing)[3],
          permission: sitePermissions.questionListing,
          subPagesPermissions: [sitePermissions.questionListing],
        },
      ],
      icon: QECSvg,
      isDropdownOpen: false,
    },
    {
      title: "ORIC",
      path: splitPathBySlash(siteRoutes.oricDashboard)[3],
      subMenus: [
        {
          title: "Dashboard",
          path: siteRoutes.oricDashboard,
          active: splitPathBySlash(siteRoutes.oricDashboard)[3],
          permission: sitePermissions.oricDashboard,
          subPagesPermissions: [sitePermissions.oricDashboard],
        },
        {
          title: "Event Types",
          path: siteRoutes.oricEventTypesListing,
          active: splitPathBySlash(siteRoutes.oricEventTypesListing)[3],
          permission: sitePermissions.oricEventTypesListing,
          subPagesPermissions: [sitePermissions.oricEventTypesListing],
        },
        {
          title: "Conference's",
          path: siteRoutes.oricConferenceListing,
          active: splitPathBySlash(siteRoutes.oricConferenceListing)[3],
          permission: sitePermissions.oricConferenceListing,
          subPagesPermissions: [sitePermissions.oricConferenceListing],
        },
        {
          title: "Calls",
          path: siteRoutes.oricCallListing,
          active: splitPathBySlash(siteRoutes.oricCallListing)[3],
          permission: sitePermissions.oricCallListing,
          subPagesPermissions: [sitePermissions.oricCallListing],
        },
        {
          title: "Career Development",
          path: siteRoutes.oricCareerDevelopmentListing,
          active: splitPathBySlash(siteRoutes.oricCareerDevelopmentListing)[3],
          permission: sitePermissions.oricCareerDevelopmentListing,
          subPagesPermissions: [sitePermissions.oricCareerDevelopmentListing],
        },
        {
          title: "Key Performance Indicators",
          path: siteRoutes.keyPerformanceIndicatorYearListing,
          active: splitPathBySlash(
            siteRoutes.keyPerformanceIndicatorYearListing
          )[3],
          permission: sitePermissions.keyPerformanceIndicatorYearListing,
          subPagesPermissions: [
            sitePermissions.keyPerformanceIndicatorYearListing,
          ],
        },
        {
          title: "Research Incentive",
          path: siteRoutes.researchIncentivesListing,
          active: splitPathBySlash(siteRoutes.researchIncentivesListing)[3],
          permission: sitePermissions.researchIncentivesListing,
          subPagesPermissions: [sitePermissions.researchIncentivesListing],
        },
        {
          title: "Communities",
          path: siteRoutes.oricCommunityListing,
          active: splitPathBySlash(siteRoutes.oricCommunityListing)[3],
          permission: sitePermissions.oricCommunityListing,
          subPagesPermissions: [sitePermissions.oricCommunityListing],
        },
        {
          title: "MoU Parties",
          path: siteRoutes.oricMouPartyListing,
          active: splitPathBySlash(siteRoutes.oricMouPartyListing)[3],
          permission: sitePermissions.oricMouPartyListing,
          subPagesPermissions: [sitePermissions.oricMouPartyListing],
        },

        {
          title: "MoU's",
          path: siteRoutes.oricMouListing,
          active: splitPathBySlash(siteRoutes.oricMouListing)[3],
          permission: sitePermissions.oricMouListing,
          subPagesPermissions: [sitePermissions.oricMouListing],
        },
        {
          title: "Manage Project Time",
          path: siteRoutes.oricProjectDateListing,
          active: splitPathBySlash(siteRoutes.oricProjectDateListing)[3],
          permission: sitePermissions.oricProjectDateListing,
          subPagesPermissions: [sitePermissions.oricProjectDateListing],
        },
        {
          title: "Project Management",
          path: siteRoutes.oricProjectlisting,
          active: splitPathBySlash(siteRoutes.oricProjectlisting)[3],
          permission: sitePermissions.oricProjectlisting,
          subPagesPermissions: [sitePermissions.oricProjectlisting],
        },
        {
          title: "Reasearch Grant Applications",
          path: siteRoutes.oricResearchGrantApplicationslisting,
          active: splitPathBySlash(
            siteRoutes.oricResearchGrantApplicationslisting
          )[3],
          permission: sitePermissions.oricResearchGrantApplicationslisting,
          subPagesPermissions: [
            sitePermissions.oricResearchGrantApplicationslisting,
          ],
        },
        {
          title: "Reasearch Projects",
          path: siteRoutes.oricResearchProjectListing,
          active: splitPathBySlash(siteRoutes.oricResearchProjectListing)[3],
          permission: sitePermissions.oricResearchProjectListing,
          subPagesPermissions: [sitePermissions.oricResearchProjectListing],
        },
        {
          title: "Major Subjects",
          path: siteRoutes.oricMajorSubjectsListing,
          active: splitPathBySlash(siteRoutes.oricMajorSubjectsListing)[3],
          permission: sitePermissions.oricMajorSubjectsListing,
          subPagesPermissions: [sitePermissions.oricMajorSubjectsListing],
        },
      ],
      icon: HomeSvg,
      isDropdownOpen: false,
    },

    {
      title: "Manage Legal Matters",
      path: splitPathBySlash(siteRoutes.legalFrameworkList)[2],
      subMenus: [
        {
          title: "FrameWork Documents",
          path: siteRoutes.legalFrameworkList,
          active: splitPathBySlash(siteRoutes.legalFrameworkList)[3],
          permission: sitePermissions.legalFrameworkList,
          subPagesPermissions: [sitePermissions.legalFrameworkList],
        },
        {
          title: "Documents Organization",
          path: siteRoutes.legalOrganizationList,
          active: splitPathBySlash(siteRoutes.legalOrganizationList)[3],
          permission: sitePermissions.legalOrganizationList,
          subPagesPermissions: [sitePermissions.legalOrganizationList],
        },
        {
          title: "Framework Document Types",
          path: siteRoutes.frameworkDocumentTypeList,
          active: splitPathBySlash(siteRoutes.frameworkDocumentTypeList)[3],
          permission: sitePermissions.frameworkDocumentTypeList,
          subPagesPermissions: [sitePermissions.frameworkDocumentTypeList],
        },
        {
          title: "Bill Request",
          path: siteRoutes.billRequestList,
          active: splitPathBySlash(siteRoutes.billRequestList)[3],
          permission: sitePermissions.billRequestList,
          subPagesPermissions: [sitePermissions.billRequestList],
        },
        {
          title: "Legal Cases",
          path: siteRoutes.legalCasesList,
          active: splitPathBySlash(siteRoutes.legalCasesList)[3],
          permission: sitePermissions.legalCasesList,
          subPagesPermissions: [sitePermissions.legalCasesList],
        },
        {
          title: "Legal Advisors",
          path: siteRoutes.legalAdvisorListing,
          active: splitPathBySlash(siteRoutes.legalAdvisorListing)[3],
          permission: sitePermissions.legalAdvisorListing,
          subPagesPermissions: [sitePermissions.legalAdvisorListing],
        },
        {
          title: "Legal Courts",
          path: siteRoutes.legalCourtList,
          active: splitPathBySlash(siteRoutes.legalCourtList)[3],
          permission: sitePermissions.legalCourtList,
          subPagesPermissions: [sitePermissions.legalCourtList],
        },
        {
          title: "Legal Status",
          path: siteRoutes.legalStatusList,
          active: splitPathBySlash(siteRoutes.legalStatusList)[3],
          permission: sitePermissions.legalStatusList,
          subPagesPermissions: [sitePermissions.legalStatusList],
        },
        {
          title: "Matter Types",
          path: siteRoutes.legalMatterTypeListing,
          active: splitPathBySlash(siteRoutes.legalMatterTypeListing)[3],
          permission: sitePermissions.legalMatterTypeListing,
          subPagesPermissions: [sitePermissions.legalMatterTypeListing],
        },
        {
          title: "Advisors Rates",
          path: siteRoutes.advisorRatesListing,
          active: splitPathBySlash(siteRoutes.advisorRatesListing)[3],
          permission: sitePermissions.advisorRatesListing,
          subPagesPermissions: [sitePermissions.advisorRatesListing],
        },
      ],
      icon: LegalMatterSvg,
      isDropdownOpen: false,
    },

    {
      title: "Library",
      path: splitPathBySlash(siteRoutes.libraryLanguagelist)[2],
      subMenus: [
        {
          title: "Languages",
          path: siteRoutes.libraryLanguagelist,
          active: splitPathBySlash(siteRoutes.libraryLanguagelist)[3],
          permission: sitePermissions.libraryLanguagelist,
          subPagesPermissions: [sitePermissions.libraryLanguagelist],
        },
        {
          title: "Publishers",
          path: siteRoutes.libraryPublisherlist,
          active: splitPathBySlash(siteRoutes.libraryPublisherlist)[3],
          permission: sitePermissions.libraryPublisherlist,
          subPagesPermissions: [sitePermissions.libraryPublisherlist],
        },
        {
          title: "Sellers",
          path: siteRoutes.librarySellerlist,
          active: splitPathBySlash(siteRoutes.librarySellerlist)[3],
          permission: sitePermissions.librarySellerlist,
          subPagesPermissions: [sitePermissions.librarySellerlist],
        },
        {
          title: "Bills",
          path: siteRoutes.libraryBillslist,
          active: splitPathBySlash(siteRoutes.libraryBillslist)[3],
          permission: sitePermissions.libraryBillslist,
          subPagesPermissions: [sitePermissions.libraryBillslist],
        },
        {
          title: "Books",
          path: siteRoutes.libraryBookslist,
          active: splitPathBySlash(siteRoutes.libraryBookslist)[3],
          permission: sitePermissions.libraryBookslist,
          subPagesPermissions: [sitePermissions.libraryBookslist],
        },
        {
          title: "Accession Register Listing",
          path: siteRoutes.libraryAccessRegisterlist,
          active: splitPathBySlash(siteRoutes.libraryAccessRegisterlist)[3],
          permission: sitePermissions.libraryAccessRegisterlist,
          subPagesPermissions: [sitePermissions.libraryAccessRegisterlist],
        },
      ],
      icon: LibrarySvg,
      isDropdownOpen: false,
    },
  ];
  const getCurrentMenu = (): string => {
    const splittedPath: string[] = splitPathBySlash(pathname);
    const currentMenu = sidebarMenus.find(
      (menu) => menu.path === splittedPath[2]
    );
    return currentMenu?.subMenus?.length ? splittedPath[2] : splittedPath[3];
  };

  const getCurrentSubMenu = (): string => {
    const splittedPath: string[] = splitPathBySlash(pathname);
    return splittedPath[3];
  };
  const [currentMenu, setCurrentMenu] = useState(getCurrentMenu());
  const [currentSubMenu, setCurrentSubMenu] = useState(pathname);
  const navigate = useNavigate();

  const handleMainMenu = (menu: any, index: number) => {
    if (menu?.link) {
      navigate(menu.link);
      if (isCurrentWidthMinimum()) {
        setOpenSidebar(false);
      }
    }
    const { isDropdownOpen } = menu;
    menus.forEach((menu: any) => {
      menu.isDropdownOpen = false;
    });
    if (!isDropdownOpen) {
      menus[index].isDropdownOpen = true;
    }
    setMenus([...menus]);
  };
  const handleSubmenu = (path: string) => {
    if (isCurrentWidthMinimum()) {
      setOpenSidebar(false);
    }

    navigate(path);
  };

  useEffect(() => {
    setCurrentMenu(getCurrentMenu());
    setCurrentSubMenu(getCurrentSubMenu());
  }, [pathname]);

  const getSidebarMenus = () => {
    let menus: any[] = [];
    sidebarMenus.forEach((menu: any) => {
      const { subMenus } = menu;
      if (!menu?.permission) {
        if (!menu.subMenus.length) {
          // menus.push(menu);
        } else {
          const subMenusWithPermissions = subMenus.filter((subMenu: any) => {
            let doesPermissionExist: boolean = false;
            for (let permission of subMenu.subPagesPermissions) {
              const domainType = getDomainType();
              if (domainType === domains.mainDomain) {
                if (!subMenu?.superAdminOptional) {
                  if (hasAccess(permission)) {
                    doesPermissionExist = true;
                    break;
                  }
                }
              } else if (domainType === domains.subDomain) {
                if (!subMenu?.adminOptional) {
                  if (hasAccess(permission)) {
                    doesPermissionExist = true;
                    break;
                  }
                }
              }
            }

            return doesPermissionExist;
          });

          if (subMenusWithPermissions.length) {
            menus.push({
              ...menu,
              subMenus: subMenusWithPermissions,
            });
          }
        }
      } else {
        if (hasAccess(menu?.permission)) {
          menus.push(menu);
        }
      }
    });

    return menus;
  };

  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    setMenus(getSidebarMenus());
  }, []);

  const getUniversityName = (): string => {
    let name: string = "";
    const splittedName = organization?.name?.replace("-", " ")?.split(" ");
    for (let item of splittedName) name += item[0];
    return name.toUpperCase();
  };

  return (
    <SidebarMain>
      {!organization?.logo ? (
        <SiteLogo>
          {isDarkTheme ? (
            <CyfyLogoDark className="icon" />
          ) : (
            <CyfyLogoSvg className="icon" />
          )}
        </SiteLogo>
      ) : (
        <SiteLogo>
          <div className="custom-logo">
            <div className="image">
              <img src={organization?.logo} alt="" />
            </div>
            <span className="uni-name">{getUniversityName()}</span>
          </div>
        </SiteLogo>
      )}
      <Menus className="p-custom-scrollbar-4">
        {menus.map((item: any, index: number) => {
          const MenuIcon = item.icon;
          return (
            <div className="particular-menu" key={index}>
              <MenuItem
                active={currentMenu === item.path}
                onClick={() => handleMainMenu(item, index)}
                isDropdownOpen={item.isDropdownOpen}
              >
                <span className="dropdown-icon">
                  {item.subMenus.length ? (
                    <DropdownIcon className="icon" />
                  ) : (
                    ""
                  )}
                </span>
                <span className="menu-icon">
                  <MenuIcon className="icon" />
                </span>
                <span className="menu-text">{item.title}</span>
              </MenuItem>
              <DropdownMenu show={item.isDropdownOpen && item.subMenus.length}>
                {item.subMenus.map((menu: any, index: number) => {
                  return (
                    <DropdownMenuItem
                      active={menu.active === currentSubMenu}
                      key={index}
                      onClick={() => handleSubmenu(menu.path)}
                    >
                      <span className="menu-text">{menu.title}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenu>
            </div>
          );
        })}
      </Menus>
    </SidebarMain>
  );
};

export default Sidebar;
