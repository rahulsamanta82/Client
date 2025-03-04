import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import OricDashboard from "containers/private/oric/oric-dashboard";
import OricEventTypeListing from "containers/private/oric/event-types/listing";
import CreateOricEventType from "containers/private/oric/event-types/create";
import OricConferenceListing from "containers/private/oric/oric-conferences/listing";
import CreateOricConference from "containers/private/oric/oric-conferences/create";
import OricCallsListing from "containers/private/oric/oric-calls/listing";
import CategoryCallListing from "containers/private/oric/calls-category/listing";
import CreateCallCategory from "containers/private/oric/calls-category/create";
import CreateOricAddCall from "containers/private/oric/oric-calls/create";
import OricCareerDevelopmentListing from "containers/private/oric/career-development/listing";
import keyPerformanceListing from "containers/private/oric/key-performance-indicator/listing";
import CreatekeyPerformance from "containers/private/oric/key-performance-indicator/create";
import ResearchIncentivesListing from "containers/private/oric/research-incentives/listing";
import CreateResearchIncentives from "containers/private/oric/research-incentives/create";
import CreateOricCommunities from "containers/private/oric/communities/create";
import OricCommunitiesListing from "containers/private/oric/communities/listing";
import CreateMouParties from "containers/private/oric/mou-parties/create";
import MouPartiesListing from "containers/private/oric/mou-parties/listing";
import OricMOUListing from "containers/private/oric/mou's/listing";
import CreateOricMOU from "containers/private/oric/mou's/create";
import ProjectTimeListing from "containers/private/oric/manage-project-time/listing";
import CreateProjectTime from "containers/private/oric/manage-project-time/create";
import ProjectManagementListing from "containers/private/oric/project-management/listing";
import CreateProjectManagement from "containers/private/oric/project-management/create";
import ResearchApplicationListing from "containers/private/oric/research-grant-application/listing";
import ResearchProjectListing from "containers/private/oric/research-project/listing";
import CreateResearchProject from "containers/private/oric/research-project/create";
import MajorSubjectsListing from "containers/private/oric/major-subjects/listing";
import CreateMajorSubjects from "containers/private/oric/major-subjects/create";
import KPIScore from "containers/private/oric/kpi-score-year";

const OricRoutes: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.oricDashboard)}
        Component={OricDashboard}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricEventTypesListing, true)}
        Component={OricEventTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricEventTypes, true)}
        Component={CreateOricEventType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricConferenceListing, true)}
        Component={OricConferenceListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricConference, true)}
        Component={CreateOricConference}
      />
      ///
      <Route
        path={getPathToSetRoute(siteRoutes.oricCallListing, true)}
        Component={OricCallsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricCalls, true)}
        Component={CreateOricAddCall}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricCallCategoriesListing, true)}
        Component={CategoryCallListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricCallCategories, true)}
        Component={CreateCallCategory}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricCareerDevelopmentListing, true)}
        Component={OricCareerDevelopmentListing}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.keyPerformanceIndicatorYearListing,
          true
        )}
        Component={keyPerformanceListing}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.createKeyPerformanceIndicatorYear,
          true
        )}
        Component={CreatekeyPerformance}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.researchIncentivesListing, true)}
        Component={ResearchIncentivesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createResearchIncentives, true)}
        Component={CreateResearchIncentives}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricCommunityListing, true)}
        Component={OricCommunitiesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricCommunity, true)}
        Component={CreateOricCommunities}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricMouPartyListing, true)}
        Component={MouPartiesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricMouParty, true)}
        Component={CreateMouParties}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricMouListing, true)}
        Component={OricMOUListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricMou, true)}
        Component={CreateOricMOU}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricProjectDateListing, true)}
        Component={ProjectTimeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricProjectDate, true)}
        Component={CreateProjectTime}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricProjectlisting, true)}
        Component={ProjectManagementListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricProject, true)}
        Component={CreateProjectManagement}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.oricResearchGrantApplicationslisting,
          true
        )}
        Component={ResearchApplicationListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricResearchProjectListing, true)}
        Component={ResearchProjectListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricResearchProject, true)}
        Component={CreateResearchProject}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.oricMajorSubjectsListing, true)}
        Component={MajorSubjectsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOricMajorSubjects, true)}
        Component={CreateMajorSubjects}
      />
         <Route
        path={getPathToSetRoute(siteRoutes.oricKPIScore, true)}
        Component={KPIScore}
      />


    </Routes>
  );
};

export default OricRoutes;
