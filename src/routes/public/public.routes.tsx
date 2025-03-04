import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import EportalPublicRoutes from "./eportal.routes";
import SuperAdminPublicRoutes from "./super-admin.routes";
import AdminPublicRoutes from "./admin.routes";

const PublicRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/e-portal/*" Component={EportalPublicRoutes} />
            <Route path="/*" Component={SuperAdminPublicRoutes} />
            <Route path="/admin/*" Component={AdminPublicRoutes} />
        </Routes>
    )
}

export default PublicRoutes;