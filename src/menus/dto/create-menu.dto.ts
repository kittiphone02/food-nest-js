import { IsString, IsNumber } from 'class-validator';

export class CreateMenuDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    imageSrc: string;

    @IsString()
    imageAlt: string;

    @IsNumber()
    menuTypeId: string;

}
