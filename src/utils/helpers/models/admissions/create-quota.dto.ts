export class CreateAdmissionQuotaDTO {
    additional_info !: string | number;
    is_active !: string | number;
    title: string = '';
    extra_fields: DynamicField[] = [];
    display_order: any = 1;
}

export class DynamicField {
    type: string = '';
    name: string = '';
    label: string = '';
    is_required: number = 1;
    class: string = '';
    options: string[] = [''];
}