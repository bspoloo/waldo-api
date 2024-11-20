import { PartialType } from '@nestjs/swagger';
import { ConnectionStatusDto } from './create-connection-status.dto';

export class UpdateConnectionStatusDto extends PartialType(ConnectionStatusDto) {}
