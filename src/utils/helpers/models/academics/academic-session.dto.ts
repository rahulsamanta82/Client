export class AcademicSessionDTO {
    id!: number;
    year: string = '';
    type: string = '';
    is_active!: number;
    sess_start_date: string = '';
    sess_end_date: string = '';
    enrol_start_date: string = '';
    enrol_end_date: string = '';
    result_declaration_date: string = '';
    result_submission_date: string = '';
    ug_course_repeat_date: string = '';
    pg_course_repeat_date: string = '';
    semester_sequence_no!: number;
    show_on_transcript!: number;
    fee_type: string = '1'
    session_id: string = '1'
}

export class AddCourseSectionDTO {
    course_id: string = '';
    section_id: string = '';
}

export class AddCourseTeacherDTO {
    course_id: string = '';
    teacher_id: string = '';
    course_type_id: string = '';
    lms_sync!: number;
}