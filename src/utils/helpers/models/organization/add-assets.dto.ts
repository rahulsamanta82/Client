export class AddAssetDTO {
    logo: string = '';
    major_category: string = ''
    minor_category: string = '';
    product: string = '';
    product_desc: string = '';
    asset_condition: string = '';
    estimated_life: string = ''
    units !: number;
}