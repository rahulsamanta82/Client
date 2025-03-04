import CreateAcademicSessionOrganization from "containers/private/organization/academic-session/create";
import AcademicSessionOrganizationListing from "containers/private/organization/academic-session/listing";
import CreateAsset from "containers/private/organization/assets-management/create";
import AssetsListing from "containers/private/organization/assets-management/listing";
import BoardManagementCreate from "containers/private/organization/board-management/create";
import BoardManagementListing from "containers/private/organization/board-management/listing";
import CreateBuilding from "containers/private/organization/building-management/create";
import BuildingsListing from "containers/private/organization/building-management/listing";
import CertificateLinkCreate from "containers/private/organization/certificate-link-to-result-type/create";
import CertificateLinksListing from "containers/private/organization/certificate-link-to-result-type/listing";
import CertificateManagementCreate from "containers/private/organization/certificate-management/create";
import CertificateManagementListing from "containers/private/organization/certificate-management/listing";
import CreateMajorCategories from "containers/private/organization/major-categories/create";
import MajorCategoriesListing from "containers/private/organization/major-categories/listing";
import CreateMinorCategories from "containers/private/organization/minor-categories/create";
import MinorCategoriesListing from "containers/private/organization/minor-categories/listing";
import ModuleManagement from "containers/private/organization/module-management";
import CreateOrganization from "containers/private/organization/organization/create";
import OrganizationListing from "containers/private/organization/organization/listing";
import ViewOrganization from "containers/private/organization/organization/view";
import CreateOrganizationalStructure from "containers/private/organization/organizational-structure/create";
import OrganizationalStructureListing from "containers/private/organization/organizational-structure/listing";
import PermissionManagementCreate from "containers/private/organization/permission-management/create";
import PermissionManagementListing from "containers/private/organization/permission-management/listing";
import CreateProgram from "containers/private/organization/programs/create";
import ProgramsListing from "containers/private/organization/programs/listing";
import LinkedSpecializationListing from "containers/private/organization/program-specialization/listing";
import ResultTypeCreate from "containers/private/organization/result-types/create";
import ResultTypeListing from "containers/private/organization/result-types/listing";
import RollManagementCreate from "containers/private/organization/role-management/create";
import RoleManagementListing from "containers/private/organization/role-management/listing";
import CreateRooms from "containers/private/organization/rooms-management/create";
import RoomsListing from "containers/private/organization/rooms-management/listing";
import CreateStructureType from "containers/private/organization/structure-type/create";
import StructureTypeListing from "containers/private/organization/structure-type/listing";
import SubjectManagementCreate from "containers/private/organization/subject-management/create";
import SubjectManagementListing from "containers/private/organization/subject-management/listing";
import SuperAdminManagementCreate from "containers/private/organization/super-admin-management/create";
import SuperAdminManagementListing from "containers/private/organization/super-admin-management/listing";
import SuperRollManagementCreate from "containers/private/organization/super-role-management/create";
import SuperRoleManagementListing from "containers/private/organization/super-role-management/listing";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import CreateLinkedProgramEntryTest from "containers/private/organization/linked-program-entry-test/create";
import LinkedProgramsEntryTestListing from "containers/private/organization/linked-program-entry-test/listing";
import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import CertificateLevelListing from "containers/private/organization/certificate-levels/listing";
import CreateCertificateLevels from "containers/private/organization/certificate-levels/create";

const OrganizationRoutes: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.organizationListing, true)}
        Component={OrganizationListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOrganization, true)}
        Component={CreateOrganization}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.viewOrganization, true)}
        Component={ViewOrganization}
      />
      <Route
        path="structure-types/create-structure-type"
        Component={CreateStructureType}
      />
      <Route
        path="structure-types/structure-types-listing"
        Component={StructureTypeListing}
      />
      <Route
        path="org-structure/create-organizational-structure"
        Component={CreateOrganizationalStructure}
      />
      <Route
        path="org-structure/organizational-structure-listing"
        Component={OrganizationalStructureListing}
      />
      <Route
        path="assets-management/assets-listing"
        Component={AssetsListing}
      />
      <Route path="assets-management/create-asset" Component={CreateAsset} />
      <Route
        path="buildings-management/buildings-listing"
        Component={BuildingsListing}
      />
      <Route
        path="buildings-management/create-building"
        Component={CreateBuilding}
      />

      <Route
        path="result-type/result-type-listing"
        Component={ResultTypeListing}
      />
      <Route
        path="result-type/result-type-create"
        Component={ResultTypeCreate}
      />
      <Route
        path="result-type/certificate-link-listing"
        Component={CertificateLinksListing}
      />
      <Route
        path="result-type/certificate-link-create"
        Component={CertificateLinkCreate}
      />
      <Route
        path="roll-management/roll-management-create"
        Component={RollManagementCreate}
      />
      <Route
        path="roll-management/role-management-listing"
        Component={RoleManagementListing}
      />
      <Route
        path="board-management/board-management-listing"
        Component={BoardManagementListing}
      />
      <Route
        path="board-management/board-management-create"
        Component={BoardManagementCreate}
      />
      <Route
        path="subject-management/subject-management-listing"
        Component={SubjectManagementListing}
      />
      <Route
        path="subject-management/subject-management-create"
        Component={SubjectManagementCreate}
      />
      <Route
        path="certificate-management/certificate-management-listing"
        Component={CertificateManagementListing}
      />
      <Route
        path="certificate-management/certificate-management-create"
        Component={CertificateManagementCreate}
      />
      <Route
        path="super-admin-management/super-admin-management-listing"
        Component={SuperAdminManagementListing}
      />
      <Route
        path="super-admin-management/super-admin-management-create"
        Component={SuperAdminManagementCreate}
      />
      <Route
        path="super-role-management/super-role-management-listing"
        Component={SuperRoleManagementListing}
      />
      <Route
        path="super-role-management/super-role-management-create"
        Component={SuperRollManagementCreate}
      />
      <Route
        path="permission-management/permission-management-listing"
        Component={PermissionManagementListing}
      />
      <Route
        path="permission-management/permission-management-create"
        Component={PermissionManagementCreate}
      />
      <Route path="module-management" Component={ModuleManagement} />
      <Route
        path="programs/linked-specialization-listing"
        Component={LinkedSpecializationListing}
      />
      <Route
        path="programs/linked-program-entry-test-listing"
        Component={LinkedProgramsEntryTestListing}
      />
      <Route
        path="programs/create-linked-program-entry-test"
        Component={CreateLinkedProgramEntryTest}
      />
      <Route
        path="academic-session-organization/academic-session-organization-listing"
        Component={AcademicSessionOrganizationListing}
      />
      <Route
        path="academic-session-organization/create-academic-session-organization"
        Component={CreateAcademicSessionOrganization}
      />
      <Route
        path="/assets-management/major-categories-listing"
        Component={MajorCategoriesListing}
      />
      <Route
        path="/assets-management/create-major-categories"
        Component={CreateMajorCategories}
      />
      <Route
        path="/assets-management/minor-categories-listing"
        Component={MinorCategoriesListing}
      />
      <Route
        path="/assets-management/create-minor-categories"
        Component={CreateMinorCategories}
      />
      <Route
        path="/buildings-management/rooms-listing"
        Component={RoomsListing}
      />
      <Route
        path="/buildings-management/create-rooms"
        Component={CreateRooms}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.certificateLevelList, true)}
        Component={CertificateLevelListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createCertificateLevels, true)}
        Component={CreateCertificateLevels}
      />
    </Routes>
  );
};

export default OrganizationRoutes;
