import CreateAdmissionCampaign from "containers/private/admissions/admission-campaigns/create";
import AdmissionCampaignsListing from "containers/private/admissions/admission-campaigns/listing";
import CreateAdmissionSession from "containers/private/admissions/admission-session/create";
import AdmissionSessionListing from "containers/private/admissions/admission-session/listing";
import AdmissionApplicantsListing from "containers/private/admissions/applicants-listing";
import EditAdmissionBoard from "containers/private/admissions/boards/edit";
import EditAdmissionCertificate from "containers/private/admissions/certificate/edit";
import EditAdmissionDocument from "containers/private/admissions/documents-management/edit";
import AdmissionDocumentsListing from "containers/private/admissions/documents-management/listing";
import CreateAdmissionETB from "containers/private/admissions/eligibility-template-bodies/create";
import AdmissionETBListing from "containers/private/admissions/eligibility-template-bodies/listing";
import CreateAdmissionETH from "containers/private/admissions/eligibility-template-headers/create";
import AdmissionETHListing from "containers/private/admissions/eligibility-template-headers/listing";
import CreateAdmissionBoardManagement from "containers/private/admissions/manage-boards/create";
import AdmissionBoardManagementListing from "containers/private/admissions/manage-boards/listing";
import CreateAdmissionCertificateManagement from "containers/private/admissions/manage-certificates/create";
import AdmissionCertificateManagementListing from "containers/private/admissions/manage-certificates/listing";
import AdmissionDocumentsMasterListing from "containers/private/admissions/manage-documents-master/listing";
import CreateManageMeritList from "containers/private/admissions/manage-merit-list/create";
import ManageMeritList from "containers/private/admissions/manage-merit-list/listing";
import CreateAdmissionQuota from "containers/private/admissions/manage-quotas/create";
import AdmissionManageQuotasListing from "containers/private/admissions/manage-quotas/listing";
import CreateAdmissionSubjectManagement from "containers/private/admissions/manage-subjects/create";
import SubjectManagementAdmissionListing from "containers/private/admissions/manage-subjects/listing";
import CreateMeritKeys from "containers/private/admissions/merit-keys/create";
import MeritKeysListing from "containers/private/admissions/merit-keys/listing";
import CreateMeritListFormula from "containers/private/admissions/merit-list-formula/create";
import MeritListFormulaListing from "containers/private/admissions/merit-list-formula/listing";
import AdmissionMeritListing from "containers/private/admissions/merit-list/listing";
import CreateAdmissionOfferLetter from "containers/private/admissions/offer-letter/create";
import AdmissionOfferLetterListing from "containers/private/admissions/offer-letter/listing";
import CreateQuotaList from "containers/private/admissions/quotas-list/create";
import QoutasListing from "containers/private/admissions/quotas-list/listing";
import QoutasProgramList from "containers/private/admissions/quotas-list/listing/programs/listing";
import StudentRegListing from "containers/private/admissions/student-registration/listing";
import AdmissionStudentListing from "containers/private/admissions/students-listing";
import CreateAdmissionTestTypes from "containers/private/admissions/test-types/create";
import TestTypesListing from "containers/private/admissions/test-types/listing";
import EligibilityTemplateCreate from "containers/private/organization/programs/listing/components/eligibility-templates/create";
import EligibilityTemplatesListing from "containers/private/organization/programs/listing/components/eligibility-templates/listing";
import CreateAddLinkMeritList from "containers/private/organization/programs/listing/components/link-merit/create";
import LinkMeritList from "containers/private/organization/programs/listing/components/link-merit/listing";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const AdmissionRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path="/admission-session/create-admission-session"
        Component={CreateAdmissionSession}
      />
      <Route
        path="/admission-session/admission-session-listing"
        Component={AdmissionSessionListing}
      />
      <Route
        path="/admission-campaign/admission-campaigns-listing"
        Component={AdmissionCampaignsListing}
      />
      <Route
        path="/admission-campaign/create-admission-campaign"
        Component={CreateAdmissionCampaign}
      />
      <Route
        path="/student-admissions/admission-students-listing"
        Component={AdmissionStudentListing}
      />
      <Route
        path="/applicant-admissions/admission-applicants-listing"
        Component={AdmissionApplicantsListing}
      />
      <Route
        path="/admission-documents-management/edit-admission-document"
        Component={EditAdmissionDocument}
      />
      <Route
        path="/admission-documents-management/admission-documents-listing"
        Component={AdmissionDocumentsListing}
      />
      <Route
        path="/admission-test-types/admission-test-types-listing"
        Component={TestTypesListing}
      />
      <Route
        path="/admission-test-types/create-admission-test-type"
        Component={CreateAdmissionTestTypes}
      />
      <Route
        path="/student-registration/student-registration-listing"
        Component={StudentRegListing}
      />
      <Route
        path="/admission-merit-list/admission-merit-listing"
        Component={AdmissionMeritListing}
      />
      <Route
        path="/admission-offer-letter/admission-offer-letters-listing"
        Component={AdmissionOfferLetterListing}
      />
      <Route
        path="/admission-offer-letter/create-admission-offer-letter"
        Component={CreateAdmissionOfferLetter}
      />
      <Route
        path="/admission-board/edit-admission-board"
        Component={EditAdmissionBoard}
      />
      <Route
        path="/admission-certificate/edit-admission-certificate"
        Component={EditAdmissionCertificate}
      />
      <Route
        path="/admission-document-master/admission-documents-master-listing"
        Component={AdmissionDocumentsMasterListing}
      />
      <Route
        path="/admission-eligibility-templates/create-admission-eligibility-template-header"
        Component={CreateAdmissionETH}
      />
      <Route
        path="/admission-eligibility-templates/create-admission-eligibility-template-body"
        Component={CreateAdmissionETB}
      />
      <Route
        path="/admission-eligibility-templates/admission-eligibility-template-headers-listing"
        Component={AdmissionETHListing}
      />
      <Route
        path="/admission-eligibility-templates/admission-eligibility-template-bodies-listing"
        Component={AdmissionETBListing}
      />
      <Route
        path="/admission-quotas/admission-quotas-listing"
        Component={AdmissionManageQuotasListing}
      />
      <Route
        path="/admission-quotas/create-admission-quotas"
        Component={CreateAdmissionQuota}
      />
      <Route
        path="/admission-subject-mangement/admission-subject-management-listing"
        Component={SubjectManagementAdmissionListing}
      />
      <Route
        path="/admission-subject-mangement/create-admission-subject-management"
        Component={CreateAdmissionSubjectManagement}
      />
      <Route
        path="/admission-board-management/admission-board-management-listing"
        Component={AdmissionBoardManagementListing}
      />
      <Route
        path="/admission-board-management/create-admission-board-management"
        Component={CreateAdmissionBoardManagement}
      />
      <Route
        path="/admission-certificate-management/admission-certificate-management-listing"
        Component={AdmissionCertificateManagementListing}
      />
      <Route
        path="/admission-certificate-management/create-admission-certificate-management"
        Component={CreateAdmissionCertificateManagement}
      />
      {/* <Route path="/linked-program-admission/linked-program-admission-listing" Component={LinkedProgramAdmissionListing} /> */}
      <Route
        path="merit-keys-management/merit-keys-listing"
        Component={MeritKeysListing}
      />
      <Route
        path="/merit-keys-management/create-merit-keys"
        Component={CreateMeritKeys}
      />
      <Route
        path="merit-list-formula-management/merit-list-formula-listing"
        Component={MeritListFormulaListing}
      />
      <Route
        path="merit-list-formula-management/create-merit-list-formula"
        Component={CreateMeritListFormula}
      />
      <Route
        path="/qoutas-list-management/AdmissionQuota-list"
        Component={QoutasListing}
      />
      <Route
        path="/qoutas-list-management/AdmissionQuota-create"
        Component={CreateQuotaList}
      />
      <Route
        path="/manage-merit-list/ManageMeritList-list"
        Component={ManageMeritList}
      />
      <Route
        path="/manage-merit-list/ManageMeritList-create"
        Component={CreateManageMeritList}
      />
      <Route
        path="/qoutas-list-management/quota-list-program-listing"
        Component={QoutasProgramList}
      />
      <Route
        path="/eligibility-templates-management/ProgramLinkTemplate-list"
        Component={EligibilityTemplatesListing}
      />
      <Route
        path="/eligibility-templates-management/ProgramLinkTemplate-create"
        Component={EligibilityTemplateCreate}
      />
      <Route
        path="/program-link-merit-management/ProgramLinkMerit-list"
        Component={LinkMeritList}
      />
      <Route
        path="/program-link-merit-management/ProgramLinkMerit-create"
        Component={CreateAddLinkMeritList}
      />
    </Routes>
  );
};

export default AdmissionRoutes;
