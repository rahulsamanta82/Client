export class AuthorityMeetingdDTO {
    id!: number;
    title: string = '';
    date: string = '';
    authority_id: string = '';
    description: string = '';
    attendance: string = '';
    attachments: Attachment[] = [
        new Attachment('notice'),
        new Attachment('agenda'),
        new Attachment('working-paper'),
        new Attachment('minutes'),
    ];
}

class Attachment {
    title: string = '';
    type: string = '';
    filename: string = '';

    constructor(type: string = '') {
        this.type = type;
    }
}