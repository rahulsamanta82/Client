export class VoucherParticularDTO {
    id!: number;
    title: string = '';
    amount !: number;
    eportal_active: string = '';
    fee_code: string = ''
    category: string = '';
    is_deleted: string = '';
    c_charge_id: string = '';
    show_in_statement: string = '';
    quota_id: string = '';
    description: string = '';

    constructor(data = {}) {
        Object.assign(this, data);
    }
}