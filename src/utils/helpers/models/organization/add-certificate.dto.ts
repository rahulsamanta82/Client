export class AddCertificateDTO {
    title: string = ''
    display_order: string = ''
    level_id: string = ''
    ask_for_subject !: number
    is_dae !: number
    required_subjects: string = ''
    required_marks !: number
    is_specialization !: number;
    level: any[] = []
    is_active !: number;
}