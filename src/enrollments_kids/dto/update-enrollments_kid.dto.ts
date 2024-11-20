import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentsKidDto } from './create-enrollments_kid.dto';

export class UpdateEnrollmentsKidDto extends PartialType(CreateEnrollmentsKidDto) {}
