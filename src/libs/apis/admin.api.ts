import { postRequest } from "utils/helpers/common/http-methods";
import { LoginFormDTO } from "utils/helpers/models/auth/login";

export const ADMIN_APIS = {
    adminLogin: (body: LoginFormDTO) => postRequest('/admin/login', body)
}