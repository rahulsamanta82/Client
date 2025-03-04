import { VoucherTemplateHeaderDTO } from "./voucher-template-header.dto";

export class AccInstallmentDTO{
    id!: number;
    template_haeder!:VoucherTemplateHeaderDTO
    title: string = '';
    show_percentage: number = 1;
    template_header_id: string = ''
}