import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDataLocationDto {
    @IsString()
    @IsNotEmpty({ message: "User ID is required" })
    id_User: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsNumber()
    batteryLevel: number;
}
