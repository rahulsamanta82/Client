import { FinanceApplicationDTO } from "./application.dto";
import { VoucherTemplateHeaderDTO } from "./voucher-template-header.dto";

export class ApplicationTemplateLinkDTO {
    id!: number;
    acc_app_id: string = '';
    acc_voucher_temp_header_id: string = ''
    ref_id: number[] = [];
    application!: FinanceApplicationDTO;
    program_title!: string;
    template_header !: VoucherTemplateHeaderDTO;

    constructor(data = {}) {
        Object.assign(this, data);
    }
}