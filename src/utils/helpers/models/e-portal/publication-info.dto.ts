export class PublicationInfoDTO {
    id!: number;
    title: string = '';
    journal_name: string = ''
    author_name: string = ''
    impact_factor: string = ''
    publication_month: string = ''
    publication_year: string = ''
    doi: string = ''
    volume_no: string = ''
    file_url: any;
}