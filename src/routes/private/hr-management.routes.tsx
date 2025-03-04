import AbsentEmployeesListing from "containers/private/hr-management/absent-employees";
import EmployeesAttendanceListing from "containers/private/hr-management/attendance";
import EmployeesOvertimeListing from "containers/private/hr-management/employees-overtime";
import LeaveCancellationListing from "containers/private/hr-management/leave-cancellation";
import LeaveRequistion from "containers/private/hr-management/leave-requestion";
import CreateLeaveTypes from "containers/private/hr-management/leave-types/create";
import LeaveTypeListing from "containers/private/hr-management/leave-types/listing";
import HRMLeavesDashboard from "containers/private/hr-management/leaves-dasbhboard";
import LeavesLedgerListing from "containers/private/hr-management/leaves-ledger";
import OvertimeManualEntryListing from "containers/private/hr-management/overtime-manual-entry";
import CreateOvertimeSlot from "containers/private/hr-management/overtime-slots/create";
import OvertimeSlotsListing from "containers/private/hr-management/overtime-slots/listing";
import ReleasedLeaveBalancingReportListing from "containers/private/hr-management/released-leave-balancing-report";
import RemunerationListing from "containers/private/hr-management/remuneration";
import RemunerationSettingsListing from "containers/private/hr-management/renumeration-settings";
import RequestedDetails from "containers/private/hr-management/requested-details";
import RequestedLeavesListing from "containers/private/hr-management/requested-leaves";
import SetHolidaysListing from "containers/private/hr-management/set-holidays/listing";
import SetOffDays from "containers/private/hr-management/set-off-days";
import useUtils from "hooks/useUtils";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const HRManagementRoutes: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.hrManagementLeaveDashboard)}
        Component={HRMLeavesDashboard}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createOvertimeSlot, true)}
        Component={CreateOvertimeSlot}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.overtimeSlotsListing, true)}
        Component={OvertimeSlotsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.absentEmployeesListing)}
        Component={AbsentEmployeesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.leaveCancellationListing)}
        Component={LeaveCancellationListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.releasedLeaveBalancingReportListing)}
        Component={ReleasedLeaveBalancingReportListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.remunerationListing)}
        Component={RemunerationListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.overtimeManualEntryListing)}
        Component={OvertimeManualEntryListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.remunerationSettingsListing)}
        Component={RemunerationSettingsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.employeesOvertimeListing)}
        Component={EmployeesOvertimeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.requestedLeavesListing)}
        Component={RequestedLeavesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.myAttendanceList)}
        Component={EmployeesAttendanceListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLeaveRequestion)}
        Component={LeaveRequistion}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.leaveTypeListing, true)}
        Component={LeaveTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createLeaveTypes, true)}
        Component={CreateLeaveTypes}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.setOffDays)}
        Component={SetOffDays}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.requestDetails)}
        Component={RequestedDetails}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.setHolidaysListing, true)}
        Component={SetHolidaysListing}
      />
    </Routes>
  );
};

export default HRManagementRoutes;
