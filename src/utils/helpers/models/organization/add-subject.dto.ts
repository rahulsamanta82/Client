export class AddSubjectDTO {
    title: string = ''
    type: string = ''
    is_specialization !: number
    is_active !: number;
}