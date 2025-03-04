import SystemLogs from "containers/private/system-administration/logs";
import CreateSystemMenus from "containers/private/system-administration/menus/create";
import SystemMenusListing from "containers/private/system-administration/menus/listing";
import UnregisteredMenusListing from "containers/private/system-administration/unregistered-menu/listing";
import UserAuditListing from "containers/private/system-administration/user-audit";
import CreateSystemUser from "containers/private/system-administration/users/create";
import UsersListing from "containers/private/system-administration/users/listing";
import CreateWorkflow from "containers/private/system-administration/workflow/create";
import WorkflowListing from "containers/private/system-administration/workflow/listing";
import Workflow from "containers/private/system-administration/workflow/listing";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const AdministrationRoutes: FC<any> = ({}) => {
  return (
    <Routes>
      <Route path="system-logs/system-logs-listing" Component={SystemLogs} />
      <Route
        path="system-users/system-users-listing"
        Component={UsersListing}
      />
      <Route
        path="system-users/create-system-users"
        Component={CreateSystemUser}
      />
      <Route path="menus/system-menus-listing" Component={SystemMenusListing} />
      <Route path="menus/create-system-menus" Component={CreateSystemMenus} />
      <Route
        path="unregistered-menus/unregistered-menus-listing"
        Component={UnregisteredMenusListing}
      />
      <Route path="/user-audit-listing" Component={UserAuditListing} />
      <Route path="/workflow/workflow-listing" Component={WorkflowListing} />
      <Route path="/workflow/create-workflow" Component={CreateWorkflow} />
 
    </Routes>
  );
};

export default AdministrationRoutes;
