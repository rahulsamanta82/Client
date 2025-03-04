import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import TestingDashboard from "containers/private/testing-services/dashboard";
import UploadTestResults from "containers/private/testing-services/upload-result";
import PublishTestResults from "containers/private/testing-services/publish-results";
import CreateTestSchedule from "containers/private/testing-services/test-schedule/create";
import ListingTestSchedule from "containers/private/testing-services/test-schedule/listing";
import CreateTestCenter from "containers/private/testing-services/test-center/create";
import ListingTestCenter from "containers/private/testing-services/test-center/listing";
import CreateTestTypes from "containers/private/testing-services/test-types/create";
import TestTypesListing from "containers/private/admissions/test-types/listing";
import CenterRoomListing from "containers/private/testing-services/test-center-rooms/listing";
import CreateCenterRoom from "containers/private/testing-services/test-center-rooms/create";
import SittingPlan from "containers/private/testing-services/seating-plan";
import SeatingPlanRoom from "containers/private/testing-services/seating-plan-room";
import ViewApplicants from "containers/private/testing-services/view-applicants";
import ApplicantList from "containers/private/testing-services/applicant-list";

const TestingServicesRoutes: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.testingServicesDashboard)}
        Component={TestingDashboard}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.testTypesListing, true)}
        Component={TestTypesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createTestType, true)}
        Component={CreateTestTypes}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.TestingServicesTestCenterlist, true)}
        Component={ListingTestCenter}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.TestingServicesTestCentercreate,
          true
        )}
        Component={CreateTestCenter}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.TestingServicesTestSchedulelist,
          true
        )}
        Component={ListingTestSchedule}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.createTestingServicesTestSchedule,
          true
        )}
        Component={CreateTestSchedule}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.testingServicespublishresult, true)}
        Component={PublishTestResults}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.testingServicescandidateTestResultlist,
          true
        )}
        Component={UploadTestResults}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.testingCenterRooms, true)}
        Component={CenterRoomListing}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.createTestingServicesTestCenterRooms,
          true
        )}
        Component={CreateCenterRoom}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.testingServicesTestScheduleSeatingPlanlist,
          true
        )}
        Component={SittingPlan}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.testingServicesTestScheduleSeatingPlanRoomslist,
          true
        )}
        Component={SeatingPlanRoom}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.viewTestApplicants, true)}
        Component={ViewApplicants}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.testingServicescandidatelisting)}
        Component={ApplicantList}
      />
    </Routes>
  );
};

export default TestingServicesRoutes;
