import { VoucherParticularDTO } from "./voucher-particular.dto";

export class VoucherTemplateBodyDTO {
    id!: number;
    header_id: string = ''
    particular_ids: number[] = [];
    voucher_particular!: VoucherParticularDTO;
    amount !: number;
}