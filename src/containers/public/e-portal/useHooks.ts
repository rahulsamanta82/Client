import useStore from "hooks/useStore";
import { USER_AUTH_APIS } from "libs/apis/user-auth.api";
import { useNavigate } from "react-router-dom";
import { errorToaster, successToaster } from "utils/helpers/common/alert-service";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { LoginFormDTO } from "utils/helpers/models/auth/login";
import { UserRegisterDTO } from "utils/helpers/models/auth/user-register.dto";


const useEportalAuth = () => {
    const { setUser, setToken, setPermissions, setRole } = useStore();
    const navigate = useNavigate();

    const userRegister = async (body: UserRegisterDTO) => {
        const response = await USER_AUTH_APIS.userRegister(body);
        if (response?.status) {
            successToaster(response?.message);
            navigate(siteRoutes.ePortalLogin);
        }
    }

    const userLogin = async (body: LoginFormDTO) => {
        const response = await USER_AUTH_APIS.userLogin(body);
        if (response?.status) {
            setRole(response?.data?.roles[0]);
            delete response?.data?.role_id;
            delete response?.data?.roles;
            setUser(response?.data);
            setToken(response?.token);
            setPermissions(response?.permissions);
            successToaster(response?.message);
            navigate(siteRoutes.ePortalDashboard, { replace: true });
        }
    }

    const userGetOtp = async (body: any, setPortion: Function) => {
        const response = await USER_AUTH_APIS.userGetOtp(body);
        if (response?.original?.status) {
            successToaster(response?.original?.message);
            setPortion(2);
        }
    }

    const userVerifyOtp = async (body: any, setPortion: Function) => {
        const response = await USER_AUTH_APIS.userVerifyOtp(body);
        if (response?.status) {
            successToaster(response?.message);
            setPortion(3);
        }
    }

    const userResetPassword = async (body: any) => {
        const response = await USER_AUTH_APIS.userResetPassword(body);
        if (response?.status) {
            successToaster(response?.message);
            if (response?.status) {
                navigate(siteRoutes.ePortalLogin);
            }
        }
    }

    return {
        userRegister,
        userLogin,
        userGetOtp,
        userVerifyOtp,
        userResetPassword
    }
}

export default useEportalAuth;