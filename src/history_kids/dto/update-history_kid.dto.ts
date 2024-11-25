import { PartialType } from '@nestjs/swagger';
import { CreateHistoryKidDto } from './create-history_kid.dto';

export class UpdateHistoryKidDto extends PartialType(CreateHistoryKidDto) {}
