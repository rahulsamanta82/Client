import SuperAdminLogin from "containers/public/super-admin/login";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const SuperAdminPublicRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" Component={SuperAdminLogin} />
        </Routes>
    )
}

export default SuperAdminPublicRoutes;