export class AddMeritFormulaDTO {
  title: string = "";
  merit: string = "";
  is_active!: number;
  // merit_keys: MeritKey[] = [];
  extra_fields: DynamicField[] = [];
}

// export class MeritKey {
//   title: string = "";
//   id!: number;
// }
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
