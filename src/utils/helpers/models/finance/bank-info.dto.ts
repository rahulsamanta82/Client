export class BankInfoDTO{
    id !: number;
    bank: string = ''
    account_no: string = ''
    account_title: string = '';
    ftn: string = '';
    code: string = '';
    remarks: string = '';
    show_account_no: number = 1;
    status: boolean = true;

    constructor(data = {}){
        Object.assign(this,data);
    }
}