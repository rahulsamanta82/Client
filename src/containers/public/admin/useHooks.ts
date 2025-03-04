import useAlert from "hooks/useAlert"
import useStore from "hooks/useStore"
import { ADMIN_APIS } from "libs/apis/admin.api"
import { useNavigate } from "react-router-dom"
import { siteRoutes } from "utils/helpers/enums/routes.enum"
import { LoginFormDTO } from "utils/helpers/models/auth/login"

interface UseAuthReturnType {
    adminLogin: (body: LoginFormDTO) => void;
}

const useAdmin = (): UseAuthReturnType => {
    // const { postRequest } = useHttp();
    const { setToken, setUser, setPermissions, setOrganization, setRole } = useStore();
    const navigate = useNavigate();
    const { successToaster, errorToaster } = useAlert();

    const adminLogin = async (body: LoginFormDTO) => {
        const response = await ADMIN_APIS.adminLogin(body);
        if (response?.status) {
            setOrganization(response?.organization);
            setRole(response?.data?.roles[0]);
            delete response?.data?.role_id;
            delete response?.data?.roles;
            setUser(response?.data);
            setToken(response?.token);
            setPermissions(response?.permissions[0]?.permissions);
            navigate(siteRoutes.structureTypeListing, { replace: false });
            successToaster(response?.message);
        }
    }
    return {
        adminLogin
    }
}

export default useAdmin;