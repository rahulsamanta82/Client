export class TemplateCourseDTO {
    id!: number;
    tc_title: string = '';
    tc_code: string = '';
    tc_description: string = '';
    tc_credit_hours: string = '';
    department_id: string = '';
    tc_is_elective!: number;
    tc_is_lab!: number;
    tc_short_title: string = '';
    tc_is_active!: number;
    tc_is_virtual!: number;
    tc_lab_credit_hours: string = '';
    grade_template_id: string = '';
    tc_total_marks: string = '';
    tc_is_research_course!: number;
    tc_is_non_credit!: number;
    for_all!: number;
}