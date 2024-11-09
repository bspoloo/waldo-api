import { PartialType } from '@nestjs/swagger';
import { CreateDataLocationDto } from './create-data-location.dto';

export class UpdateDataLocationDto extends PartialType(CreateDataLocationDto) {}
