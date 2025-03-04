export class UpdateUserProfileDTO {
    gender: string = '';
    phone_no: string = '';
    email: string = '';
    date_of_birth: string = '';
    domicile: string = '';
    m_address: string = '';
    m_city: string = '';
    p_address: string = '';
    p_city: string = '';
    is_self_dependent: number = 0;
    profile_image: string = '';
    cnic_image: string = '';
    cnic_back_image: string = '';
    domicile_certificate: string = '';
    guardian_name: string = ''
    guardian_status: string = ''
    guardian_relation: string = ''
    guardian_monthly_income: string = ''
    guardian_occupation: string = ''
    guardian_phone: string = ''
    guardian_cnic: string = ''
    guardian_dependent: string = ''
    guardian_email: string = ''
    blood_group: string = ''
    how_did_know: string = ''
    disability: string = ''
    religion: string = ''
    is_hafiz: string = ''
    it_deficiency !: string | number;
    hostel_check !: number | string;
    kin_name: string = ''
    relation_with_kin: string = ''
    kin_cnic: string = ''
    kin_phone: string = ''
    kin_email: string = ''
}

export class GuardianInfoDTO {
    guardian_name: string = ''
    guardian_status: string = ''
    guardian_relation: string = ''
    guardian_monthly_income: string = ''
    guardian_occupation: string = ''
    guardian_phone: string = ''
    guardian_cnic: string = ''
    guardian_dependent: string = ''
    guardian_email: string = ''
}

export class AdditionalInfoDTO {
    blood_group: string = ''
    how_did_know: string = ''
    disability: string = ''
    religion: string = ''
    is_hafiz: string = ''
    it_deficiency: string = ''
    hostel_check: string = ''
    kin_name: string = ''
    relation_with_kin: string = ''
    kin_cnic: string = ''
    kin_phone: string = ''
    kin_email: string = ''
}