export class AddQualificationDTO {
    certificate_level_id: string = '';
    certificate_type_id: string = '';
    board_id: string = '';
    result_type_id: string = '';
    roll_num: string = '';
    passing_year: string = '';
    reg_num: string = '';
    total_marks !: number;
    obt_marks !: number;
    result_document: any;
    subject_results: SubjectResults[] = [];
}

export class SubjectResults{
    subject_id !: number;
    obt_marks !: number;
    total_marks !: number;
}