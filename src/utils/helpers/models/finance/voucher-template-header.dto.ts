import { VoucherTypeDTO } from "./voucher-type.dto";

export class VoucherTemplateHeaderDTO {
    id!: number;
    title: string = '';
    bank_ids: number[] = []
    acc_code: string = '';
    table_name: string = '';
    column_name: string = '';
    tbl_pk_field: string = '';
    db_name: string = ''
    voucher_type_id: string = '';
    voucher_type!: VoucherTypeDTO;

    constructor(data = {}) {
        Object.assign(this, data)
    }
}