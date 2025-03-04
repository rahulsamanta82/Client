export class JobApplicationDTO {
    job_id: string = '';
    department: string = ''
    job_type: string = ''
    campus: string = ''
    job_status_id: string = ''
    remarks: string = ''
    challan_status: string = ''
}

export class JobApplyDTO {
    job_id: string = '';
    department: string = '';
    job_type: string = '';
    campus: string = '';
    accept: number = 0;
}