import { VoucherTemplateHeaderDTO } from "../finance/voucher-template-header.dto";
import { JobBatchDTO } from "./job-batch.dto";
import { JobTemplateDTO } from "./job-template.dto";

export class JobPostDTO {
    id!: number;
    template_id: string = '';
    add_no: string = '';
    batch_id: string = '';
    case_no: string = '';
    women_post: string = '';
    disabled_post: string = '';
    minorities_post: string = '';
    special_quota: string = '';
    closing_date: string = '';
    in_house_date: string = '';
    internal_employee: string = '';
    in_house_user: string = '';
    department_id: number[] = [];
    job_type_id: number[] = [];
    campus_id: number[] = [];
    job_batch!: JobBatchDTO;
    job_template!: JobTemplateDTO;
    department!: any[];
    job_type!: any[];
    campus!: any[];
    voucher_template_header!: VoucherTemplateHeaderDTO
}