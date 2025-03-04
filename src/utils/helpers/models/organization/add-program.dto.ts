export class AddProgramDTO {
    title: string = '';
    level_id !: number;
    cat_id: string = '';
    semesters !: number;
    interview_passing_marks !: number;
    degree_title: string = '';
    min_credit_hrs: number = 1;
    max_credit_hrs: number = 20;
    status !: number;
    course_repeat_fee !: number;
    years_of_education !: number;
    program_type: string = '';
    program_shift: string = '';
    reg_prefix: string = ''
    duration: string = '';
    code: string = '';
    cat_type_id: string = '';
    years: string = ''


}