export class AddBuildingDTO {
    title: string = '';
    short_name: string = '';
    building_length: number = 0;
    building_width: number = 0;
    img_url: any;
    map_img_url: any;
    latitude !: number;
    longitude !: number;
    location_type_id : string = ''
    building_type_id : string = '';
}