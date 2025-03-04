export class SeatingPlanDTO {
    id!: number;
    test_schedule_id: string = '';
    test_date: string = '';
    start_time: string = '';
    end_time: string = '';
    gender_type: string = '';
    // php_program?: string;
    phd_programs: number[] = [];
}