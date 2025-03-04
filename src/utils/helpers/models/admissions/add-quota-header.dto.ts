export class AddQuotaHeaderDTO {
  title: string = "";
  reconsider_from_quotas: number[] = [];
  not_reconsider_from_quotas: number[] = [];
  fee_status: string = "";
  template_id: string = "";
  seats: number = 0;
  seq_no: number = 0;
}
