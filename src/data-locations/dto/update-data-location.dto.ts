import { PartialType } from '@nestjs/swagger';
import { CreateDataLocationDto } from './create-data-location.dto';

export class UpdateDataLocationDto extends PartialType(CreateDataLocationDto) {
    id_Kid: number;
    latitude: number;
    longitude: number;
    batteryLevel: number;
}
