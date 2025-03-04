export class TestScheduleDTO {
    id!: number;
    description: string = '';
    test_id: string = '';
    session_id: string = '';
    start_date: string = '';
    end_date: string = '';
    fee: string = '';
    test_date: string = '';
    result_date: string = '';
    result_valid_till: string = '';
    challan_upload_date: string = '';
    in_house_close_date: string = '';
    in_house_users: string = '';
    expected_date: string = '';
    center_ids: number[] = [];
    batch: string = '';
    is_phd!: number;
    valid_years: string = '';
    passing_marks: string = '';
    is_active!: number;
    acc_application_id: string = '';
    voucher_template_id: string = ''
    
}