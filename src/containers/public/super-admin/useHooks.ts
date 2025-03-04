import useAlert from "hooks/useAlert"
import useStore from "hooks/useStore"
import { SUPER_ADMIN_APIS } from "libs/apis/super-admin.api"
import { useNavigate } from "react-router-dom"
import { siteRoutes } from "utils/helpers/enums/routes.enum"
import { LoginFormDTO } from "utils/helpers/models/auth/login"

interface UseAuthReturnType {
    superAdminLogin: (body: LoginFormDTO) => void;
}

const useAuth = (): UseAuthReturnType => {
    const { setToken, setUser, setPermissions, setRole } = useStore();
    const navigate = useNavigate();
    const { successToaster } = useAlert();
    const superAdminLogin = async (body: LoginFormDTO) => {
        const response = await SUPER_ADMIN_APIS.superAdminLogin(body);
        if (response?.data) {
            setRole(response?.data?.roles[0]);
            delete response?.data?.role_id;
            delete response?.data?.roles;
            setUser(response?.data);
            setToken(response?.token);
            setPermissions(response?.permissions[0]?.permissions);
            navigate(siteRoutes.superAdminDashboard, { replace: true });
            successToaster(response?.message);
        }
    }

    return {
        superAdminLogin,
    }
}

export default useAuth;