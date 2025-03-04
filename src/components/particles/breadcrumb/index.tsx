import { FC } from "react";
import { BreadCrumbLink, BreadCrumbMain } from "./style";
import { breadcrumbs } from "utils/constants/array";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "hooks/useStore";
import { ROUTES_PERMISSIONS } from "utils/constants/pages-routes";

interface BreadcrumbProps {
    links?: BreadcrumbLink[]
}

export interface BreadcrumbLink {
    title: string;
    path: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ links }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { hasAccess } = useStore();
    let breadcrumb = links || [];
    if (!links) {
        const key = pathname.split("/")[pathname.split("/").length - 1];
        breadcrumb = breadcrumbs[key];
    }

    const handleNavigation = (route: string) => {
        const permission = ROUTES_PERMISSIONS.find(permission => permission.path === route)?.permission;
        if (hasAccess(permission as string)) {
            navigate(route);
        }
    };
    return (
        <BreadCrumbMain>
            {breadcrumb.map((item: any, index: number) => {
                return (
                    <BreadCrumbLink
                        active={pathname === item.path}
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                    >
                        {item.title}
                    </BreadCrumbLink>
                );
            })}
        </BreadCrumbMain>
    );
};

export default Breadcrumb;
