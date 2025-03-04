import AdminDashboard from "containers/private/dashboard/admin-dashboard";
import SuperAdminDashboard from "containers/private/dashboard/super-admin-dashboard";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const DashboardRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/super-admin-dashboard" Component={SuperAdminDashboard} />
            <Route path="/admin-dashboard" Component={AdminDashboard} />


        </Routes>
    )
}

export default DashboardRoutes;