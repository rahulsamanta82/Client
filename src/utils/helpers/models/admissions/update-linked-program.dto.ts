export class UpdateLinkedProgramDTO{
    admission_session_id: string = '';
    fee_due_date: string = '';
    class_start_date: string = '';
    admission_status !: number;
}