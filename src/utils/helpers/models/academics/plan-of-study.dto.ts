export class PlanOfStudyDTO{
    id!: number;
    title:string = '';
    program_id:string = '';
    grade_template_id:string = '';
    result_template_id:string = '';
    degree_title:string = '';
    total_semesters !: number;
    is_validated!: number;
    }