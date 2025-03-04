import { deleteRequest, getRequest, postRequest, putRequest } from "utils/helpers/common/http-methods";
import { UserManagementDTO } from "utils/helpers/models/system-administration/user-management.dto";

export const SYSTEM_ADMINISTRATION_APIs = {
    createUser: (body: UserManagementDTO) => postRequest(`admin/user/create`, body),
    updateUser: (id: number, body: any) => postRequest(`admin/user/update/${id}`, body),
    getUsers: (params: any) => getRequest(`admin/users/list`, params),
    getUserById: (id: number) => getRequest(`admin/user/${id}`),
    deleteUserById: (id: number) => deleteRequest(`admin/user/delete/${id}`),
    getRoles: (params: any) => getRequest(`admin/role/list`, params),
    getCitiesByAdmin: () => getRequest(`admin/cities`),
}