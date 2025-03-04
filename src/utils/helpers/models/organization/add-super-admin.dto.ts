export class AddSuperAdminDTO {
    name: string = '';
    email: string = '';
    password: string = '';
    status !: number;
    role_id: string = ''
}