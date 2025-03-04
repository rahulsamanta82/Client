import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import FrameworkListing from "containers/private/legal-matters/framework/lsiting";
import CreateFramework from "containers/private/legal-matters/framework/create";
import LegalOrganizationListing from "containers/private/legal-matters/legal-organization/listing";
import CreateLegalOrganization from "containers/private/legal-matters/legal-organization/create";
import FrameworkDocumentTypeListing from "containers/private/legal-matters/framework-document-type/listing";
import CreateFrameworkDocumentType from "containers/private/legal-matters/framework-document-type/create";
import BillRequestListing from "containers/private/legal-matters/bill-request/listing";
import CreateBillRequest from "containers/private/legal-matters/bill-request/create";
import LegalCasesListing from "containers/private/legal-matters/legal-cases/listing";
import CreateLegalCases from "containers/private/legal-matters/legal-cases/create";
import LegalAdvisorListing from "containers/private/legal-matters/legal-advisors/listing";
import CreateLegalAdvisors from "containers/private/legal-matters/legal-advisors/create";
import LegalCourtListing from "containers/private/legal-matters/legal-courts/listing";
import CreateLegalCourts from "containers/private/legal-matters/legal-courts/create";
import LegalStatusListing from "containers/private/legal-matters/legal-status/listing";
import CreateLegalStatus from "containers/private/legal-matters/legal-status/create";
import MatterTypeListing from "containers/private/legal-matters/matter-types/listing";
import CreateMatterTypes from "containers/private/legal-matters/matter-types/create";
import AdvisorsRatesListing from "containers/private/legal-matters/advisor-rates/listing";
import CreateAdvisorRates from "containers/private/legal-matters/advisor-rates/create";

const LegalMatters: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.legalFrameworkList, true)}
        Component={FrameworkListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalFramework, true)}
        Component={CreateFramework}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.legalOrganizationList, true)}
        Component={LegalOrganizationListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalOrganization, true)}
        Component={CreateLegalOrganization}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.frameworkDocumentTypeList, true)}
        Component={FrameworkDocumentTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createFrameworkDocumentType, true)}
        Component={CreateFrameworkDocumentType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.billRequestList, true)}
        Component={BillRequestListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createBillRequest, true)}
        Component={CreateBillRequest}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.legalCasesList, true)}
        Component={LegalCasesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalCases, true)}
        Component={CreateLegalCases}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.legalAdvisorListing, true)}
        Component={LegalAdvisorListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalAdvisor, true)}
        Component={CreateLegalAdvisors}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.legalCourtList, true)}
        Component={LegalCourtListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalCourt, true)}
        Component={CreateLegalCourts}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.legalStatusList, true)}
        Component={LegalStatusListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalStatus, true)}
        Component={CreateLegalStatus}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.legalMatterTypeListing, true)}
        Component={MatterTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLegalMatterType, true)}
        Component={CreateMatterTypes}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.advisorRatesListing, true)}
        Component={AdvisorsRatesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAdvisorRates, true)}
        Component={CreateAdvisorRates}
      />
    </Routes>
  );
};

export default LegalMatters;
