import ForgetPassword from "containers/public/admin/forget-password";
import AdminLogin from "containers/public/admin/login";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const AdminPublicRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/login" Component={AdminLogin} />
            <Route path="/login/forget-password" Component={ForgetPassword} />
        </Routes>
    )
}

export default AdminPublicRoutes;