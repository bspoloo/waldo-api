import { IsString, IsNumber } from 'class-validator';

export class CreateDataLocationDto {
    @IsString()
    id_Kid: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsNumber()
    batteryLevel: number;
}
