import CreateAuthorities from "containers/private/authorities/authorities-and-communities/create";
import AuthorotiesListing from "containers/private/authorities/authorities-and-communities/listing";
import CreateAuthorityBoard from "containers/private/authorities/authority-boards/create";
import AuthorityBoardsListing from "containers/private/authorities/authority-boards/listing";
import CreateMembersTypes from "containers/private/authorities/authority-member-types/create";
import AuthorityMemberTypeListing from "containers/private/authorities/authority-member-types/listing";
import CreateTypes from "containers/private/authorities/authority-types/create";
import AuthorityTypeListing from "containers/private/authorities/authority-types/listing";

import CreateNotifications from "containers/private/authorities/council-notifications/create";
import CouncilNotificationListing from "containers/private/authorities/council-notifications/listing";
import CreateMeetings from "containers/private/authorities/senate-meetings/create";
import SenateMeetingListing from "containers/private/authorities/senate-meetings/listing";
import ViewDocument from "containers/private/authorities/view-documents";
import ViewMember from "containers/private/authorities/view-members";
import CenterRoomListing from "containers/private/testing-services/test-center-rooms/listing";
import useUtils from "hooks/useUtils";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const AuthoritiesRoutes: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.authoritiesListing, true)}
        Component={AuthorotiesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAuthorities, true)}
        Component={CreateAuthorities}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.viewMembers)}
        Component={ViewMember}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.viewDocuments)}
        Component={ViewDocument}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.senateMeetingList, true)}
        Component={SenateMeetingListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.councilNotificationsListing, true)}
        Component={CouncilNotificationListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createCouncilNotifications, true)}
        Component={CreateNotifications}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.authorityMemberTypeListing, true)}
        Component={AuthorityMemberTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAuthorityMemberType, true)}
        Component={CreateMembersTypes}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.authorityTypeListing, true)}
        Component={AuthorityTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAuthorityType, true)}
        Component={CreateTypes}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createSenateMeeting, true)}
        Component={CreateMeetings}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAuthorityBoard, true)}
        Component={CreateAuthorityBoard}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.authorityBoardsListing, true)}
        Component={AuthorityBoardsListing}
      />
    </Routes>
  );
};

export default AuthoritiesRoutes;
