import { postRequest } from "utils/helpers/common/http-methods";
import { LoginFormDTO } from "utils/helpers/models/auth/login";
import { UserRegisterDTO } from "utils/helpers/models/auth/user-register.dto";

export const USER_AUTH_APIS = {
    userRegister: (body: UserRegisterDTO) => postRequest('/user/register', body),
    userLogin: (body: LoginFormDTO) => postRequest('/user/login', body),
    userGetOtp: (body: any) => postRequest(`user/get/otp`, body),
    userVerifyOtp: (body: any) => postRequest(`user/verify/otp`, body),
    userResetPassword: (body: any) => postRequest(`/user/reset/password`, body),
}