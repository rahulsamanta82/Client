import { getRequest, postRequest } from "utils/helpers/common/http-methods";
import { LoginFormDTO } from "utils/helpers/models/auth/login";
import { AddCertificateLevelDTO } from "utils/helpers/models/organization/add-certificate-levels.dto";

export const SUPER_ADMIN_APIS = {
  superAdminLogin: (body: LoginFormDTO) => postRequest("/super/login", body),
  getCertificateLevelsSuperAdmin: () => getRequest("/super/certificatelevels"),
  createCertificateLevels: (body: AddCertificateLevelDTO) =>
    postRequest("/super/certificatelevels", body),
};
