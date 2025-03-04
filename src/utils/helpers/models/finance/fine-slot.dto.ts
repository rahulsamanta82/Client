import { FinanceApplicationDTO } from "./application.dto";

export class FineSlotDTO{
    id!: number;
    title: string = '';
    application_id: string = '';
    start_date:string = '';
    end_date:string = '';
    late_fee_fine:string = '';
    reinstate_fine:string = '';
    year:string = '';
    semester:string = '';
    application!: FinanceApplicationDTO;

    constructor(data = {}){
        console.log(data, 'data')
        Object.assign(this,data);
    }
}