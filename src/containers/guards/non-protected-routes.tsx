import useStore from "hooks/useStore";
import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES_PERMISSIONS } from "utils/constants/pages-routes";

interface NonProtectedRoutesProps {
    children: ReactElement;
}

const NonProtectedRoutes: FC<NonProtectedRoutesProps> = ({ children }) => {
    const location = useLocation();
    const {
        getToken,
        getDomainDefaultAuthRoute,
        getDomainDefaultUnAuthRoute,
        getDomainType
    } = useStore();

    const token = getToken();
    
    if (token) {
        const authDefaultRoute = getDomainDefaultAuthRoute();
        return <Navigate to={authDefaultRoute} replace />
    } else if (!token) {
        const route = ROUTES_PERMISSIONS.find((d: any) => d.path === location.pathname);
        if (!route?.domains.includes(getDomainType() as any)) {
            const unAuthDefaultRoute = getDomainDefaultUnAuthRoute();
            return <Navigate to={unAuthDefaultRoute} replace />
        }
    }

    return children;
}

export default NonProtectedRoutes;