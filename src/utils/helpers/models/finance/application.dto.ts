import { BankInfoDTO } from "./bank-info.dto";

export class FinanceApplicationDTO {
        id!: number;
        title: string = '';
        code: string = '';
        token: string = '';
        challan_title: string = '';
        bank_ids: number[] = [];
        banks!: BankInfoDTO[];
}