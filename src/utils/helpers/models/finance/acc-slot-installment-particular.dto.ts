import { VoucherParticularDTO } from "./voucher-particular.dto";

export class AccSlotInstallmentParticular {
    id!: number;
    slot_id !: number;
    particular_id: number[] = [];
    particular!: VoucherParticularDTO;
    amount!: number;
}