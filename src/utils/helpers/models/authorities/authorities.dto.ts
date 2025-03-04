export class AuthorityDTO {
    id!: number;
    name: string = '';
    type_id: string = '';
    faculty_id: string = '';
    department_id: string = '';
    description: string = '';
    teaching_type: string = 'all';
    campus_id: string = '';
    authority_board_id: string = '';
    is_appointing_authority: string = '';
    reference: string = '';
    formation_date: string = '';
    document: any;
    is_active!: number;
    internal_members: InternalMember[] = [new InternalMember()];
    external_members: ExternalMember[] = [new ExternalMember()];
}

export class InternalMember {
    title: string = '';
    remarks: string = '';
    attendance: string = '';
    active_from: string = '';
    active_to: string = '';
    user_id: string = '';
    authority_mem_type_id: string = '';
    is_active!: number;
}

export class ExternalMember {
    first_name: string = '';
    last_name: string = '';
    email: string = ''
}