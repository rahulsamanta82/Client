export class BankTransactionDTO {
    transaction_id: string = '';
    expiry_date: string = '';
    due_date: string = '';
}

export class BankDiscountAdjustmentDTO {
    transaction_id: string = '';
    particular_id: string = '';
}