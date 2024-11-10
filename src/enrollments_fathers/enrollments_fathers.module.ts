import { Module } from '@nestjs/common';
import { EnrollmentsFathersService } from './enrollments_fathers.service';
import { EnrollmentsFathersController } from './enrollments_fathers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsFather } from './entities/enrollments_father.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentsFather])],
  controllers: [EnrollmentsFathersController],
  providers: [EnrollmentsFathersService],
})
export class EnrollmentsFathersModule {}
