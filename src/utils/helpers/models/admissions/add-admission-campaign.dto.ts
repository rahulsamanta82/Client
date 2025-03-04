export class AddAdmissionCampaignDTO {
  title: string = "";
  session_id: string = "";
  cat_id: string = "";
  program_id: number[] = [];
  fee_due_date: string = "";
  class_start_date: string = "";
  admission_status!: number;
  certificate_level_id: string = "";
  mission: string = "";
  description: string = "";
  extra_fields: DynamicField[] = [];
  external_fields: DynamicField[] = [];
  internal_fields: DynamicField[] = [];
}
export class DynamicField {
  level: any = "";
  type: any = "";
  is_hafiz: number = 1;
  is_test: number = 1;
  level_weightage: number = 1;
  marks: number = 0;
  test_weightage: number = 1;
  options: string[] = [];
}
