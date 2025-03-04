export class JobBatchDTO {
    id!: number;
    title: string = '';
    batch_type: number = 1;
    is_active!: number;
    start_date: string = '';
    end_date: string = ''
}