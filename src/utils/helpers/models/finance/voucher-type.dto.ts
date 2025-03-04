export class VoucherTypeDTO{
    id !: number;
    title: string = '';
    acc_code: string = '';
    api_code: string = '';
    status: number = 1;

    constructor(data = {}){
        Object.assign(this,data);
    }
}