export class AddEntryTestDTO {
  test_id: string = "";
  roll_number: string = "";
  test_date: string = "";
  total_marks!: number;
  obtained_marks!: number;
  certificate: any;
  result_awaiting: number = 0;
  is_verified!: number;
  result_document: string = "";
  status: any = 0;
  start_date!: number;
  due_date!: number;
}
