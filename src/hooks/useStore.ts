import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { SHARED_REDUCER_ACTIONS } from "store/reducers/shared.reducer";
import { ROLES } from "utils/helpers/enums/roles.enums";
import { domains } from "utils/helpers/enums/shared.enums";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { ROUTES_PERMISSIONS } from "utils/constants/pages-routes";

const useStore = () => {
  const dispatch = useDispatch();

  const dispatchAction = (type: string, payload?: any): void => {
    const dispatcher: UnknownAction = { type, payload };
    dispatch(dispatcher);
  };

  const setLoading = (isLoading: boolean): void => {
    dispatchAction(SHARED_REDUCER_ACTIONS.LOADING, isLoading);
  };

  const setToken = (payload: null | string): void => {
    dispatch({ type: SHARED_REDUCER_ACTIONS.SAVE_TOKEN, payload });
    if (payload) localStorage.setItem("token", payload);
  };

  const setUser = (payload: any): void => {
    dispatchAction(SHARED_REDUCER_ACTIONS.SAVE_USER, payload);
    localStorage.setItem("user", JSON.stringify(payload));
  };

  const getFilePathWithBackend = (path: string): string => {
    return `${process.env.REACT_APP_BASE_URL}/${path}`;
  }

  const setPermissions = (permissions: any[]) => {
    const permissionsToSave = permissions.map((permission) => {
      return typeof permission === "string" ? permission : permission.name;
    });
    // permissionsToSave.push(sitePermissions.academicSessionListing);
    // permissionsToSave.push(sitePermissions.academicSessionManagementListing);
    // permissionsToSave.push(sitePermissions.academicCourseListing);
    // permissionsToSave.push(sitePermissions.createAcademicCourse);
    // permissionsToSave.push(sitePermissions.allocateCourseRoomListing);
    // permissionsToSave.push(sitePermissions.academicGradeBookListing);

    // permissionsToSave.push(sitePermissions.oricDashboard);
    // permissionsToSave.push(sitePermissions.oricEventTypesListing);
    // permissionsToSave.push(sitePermissions.createOricEventTypes);
    // permissionsToSave.push(sitePermissions.oricConferenceListing);
    // permissionsToSave.push(sitePermissions.createOricConference);
    // permissionsToSave.push(sitePermissions.oricCallListing);
    // permissionsToSave.push(sitePermissions.createOricCalls);
    // permissionsToSave.push(sitePermissions.oricCallCategoriesListing);
    // permissionsToSave.push(sitePermissions.createOricCallCategories);
    // permissionsToSave.push(sitePermissions.oricCareerDevelopmentListing);
    // permissionsToSave.push(sitePermissions.keyPerformanceIndicatorYearListing);
    // permissionsToSave.push(sitePermissions.createKeyPerformanceIndicatorYear);
    // permissionsToSave.push(sitePermissions.researchIncentivesListing);

    // permissionsToSave.push(sitePermissions.commonCoursesPoolsListing);
    // permissionsToSave.push(sitePermissions.createCommonCoursesPools);
    // permissionsToSave.push(sitePermissions.poolTeachersListing);
    // permissionsToSave.push(sitePermissions.academicStudent);
    // permissionsToSave.push(sitePermissions.academicStudentFine);
    // permissionsToSave.push(sitePermissions.academicDefaulterStudent);
    // permissionsToSave.push(sitePermissions.academicFeeTypeListing);

    localStorage.setItem("permissions", JSON.stringify(permissionsToSave));
    // sitePermissions.createOrgStructure, sitePermissions.orgStructureListing
    dispatchAction(SHARED_REDUCER_ACTIONS.SAVE_PERMISSIONS, [
      ...permissionsToSave,
    ]);
  };

  const getPermissions = () => {
    const permissions = localStorage.getItem("permissions");
    if (permissions) {
      return JSON.parse(permissions);
    } else {
      return [];
    }
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  const setRole = (role: any): void => {
    localStorage.setItem("role", JSON.stringify(role));
  };

  const hasAccess = (permission: string): boolean => {
    const permissions = getPermissions();
    return permissions.includes(permission);
  };

  const getRole = (): any => {
    const role = localStorage.getItem("role");
    if (role) {
      return JSON.parse(role);
    } else {
      return null;
    }
  };

  const logout = () => {
    dispatchAction(SHARED_REDUCER_ACTIONS.LOGOUT);
    localStorage.clear();
  };

  const setDarkTheme = (isDarkTheme: boolean) => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    dispatchAction(SHARED_REDUCER_ACTIONS.THEME_CHANGE, isDarkTheme);
  };

  const getDomainDefaultUnAuthRoute: any = () => {
    const domainType = getDomainType();
    if (domainType == domains.mainDomain) {
      return siteRoutes.superAdminLogin;
    } else {
      return siteRoutes.ePortalLogin;
    }
  };

  const getUser = (): any => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  };

  const getDomainDefaultAuthRoute: any = () => {
    const domainType = getDomainType();
    if (domainType == domains.mainDomain) {
      return siteRoutes.superAdminDashboard;
    } else {
      const userRole = getRole();
      if (userRole?.guard_name == ROLES.ADMIN) {
        if (hasAccess(sitePermissions.adminDashboard)) {
          return siteRoutes.adminDashboard;
        } else {
          const permissions = getPermissions();
          const firstPermissionRoute = ROUTES_PERMISSIONS.find(
            (p: any) => p.permission === permissions[0]
          );
          return firstPermissionRoute?.path;
        }
      } else if (userRole?.guard_name == ROLES.USER) {
        return siteRoutes.ePortalDashboard;
      }
    }
  };

  const isSuperAdmin = () => {
    const role = getRole();
    return role?.guard_name === ROLES.SUPER_ADMIN;
  };

  const setOrganization = (payload: any) => {
    dispatchAction(SHARED_REDUCER_ACTIONS.SAVE_ORGANIZATION, payload);
    localStorage.setItem("organization", JSON.stringify(payload));
  };

  // (domain === '192.168.100.44' || domain === '192.168.0.196' || domain === domain.replace(domain.split('.')[0], 'org'))

  const getDomainType = () => {
    const domain = getDomain();
    if (
      domain === "localhost" ||
      domain === "www.umsoncloud.com" ||
      domain === "umsoncloud.com"
    ) {
      return domains.mainDomain;
    } else {
      return domains.subDomain;
    }
  };
  const getDomain = (): string => {
    return window.location.hostname;
  };

  const getOrganization = (): any => {
    const org = localStorage.getItem("organization");
    if (org) {
      return JSON.parse(org);
    } else {
      return null;
    }
  };

  return {
    setToken,
    setLoading,
    dispatchAction,
    setDarkTheme,
    logout,
    setUser,
    getDomainDefaultUnAuthRoute,
    getDomainDefaultAuthRoute,
    getFilePathWithBackend,
    setPermissions,
    hasAccess,
    getDomainType,
    getPermissions,
    getToken,
    setOrganization,
    getOrganization,
    getRole,
    setRole,
    isSuperAdmin,
  };
};

export default useStore;
