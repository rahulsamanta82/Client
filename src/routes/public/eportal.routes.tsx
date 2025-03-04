import StudentAuthLayout from "components/layout/page-containers/student-auth-layout";
import EPortalLogin from "containers/public/e-portal/login";
import EportalRegister from "containers/public/e-portal/register";
import EportalResetPassword from "containers/public/e-portal/reset-password";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const EportalPublicRoutes: FC = () => {
    return (
        <StudentAuthLayout>
            <Routes>
                <Route path="/login" Component={EPortalLogin} />
                <Route path="/register" Component={EportalRegister} />
                <Route path="/reset-password" Component={EportalResetPassword} />

            </Routes>
        </StudentAuthLayout>
    )
}

export default EportalPublicRoutes;