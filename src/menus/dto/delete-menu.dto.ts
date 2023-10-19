
import { IsNumberString } from 'class-validator';

export class DeleteMenuDto {
    @IsNumberString()
    id: string;
}
