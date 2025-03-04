import { JobDesignationDTO } from "../careers/designation.dto";

export class EmployementInfoDTO {
    id!: number;
    employer_name: string = '';
    designation_id: string = '';
    salary_drawn !: number;
    periodfrom: string = '';
    periodto: string = '';
    is_continue: number = 0;
    leavingreason: string = '';
    document_path!: any;
    duration!: string;
    designation!: JobDesignationDTO
}