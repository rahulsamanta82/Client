import useStore from "hooks/useStore";
import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES_PERMISSIONS } from "utils/constants/pages-routes";

interface ProtectedRoutesProps {
    children: ReactElement
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
    const {
        getToken,
        hasAccess,
        getDomainDefaultUnAuthRoute,
        getDomainDefaultAuthRoute,
    } = useStore();
    const location = useLocation();
    const token = getToken();

    if (token) {
        const route = ROUTES_PERMISSIONS.find(item => item.path === location.pathname);
        if (!hasAccess(route?.permission as string)) {
            const authRoute = getDomainDefaultAuthRoute();
            return <Navigate to={authRoute} replace />
        }
    } else {
        const unAuthRoute = getDomainDefaultUnAuthRoute();
        return <Navigate to={unAuthRoute} replace />
    }

    return children;
}

export default ProtectedRoutes;