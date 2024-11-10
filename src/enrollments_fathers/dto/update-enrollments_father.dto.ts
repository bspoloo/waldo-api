import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentsFatherDto } from './create-enrollments_father.dto';

export class UpdateEnrollmentsFatherDto extends PartialType(CreateEnrollmentsFatherDto) {}
