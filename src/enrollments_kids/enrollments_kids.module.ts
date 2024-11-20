import { Module } from '@nestjs/common';
import { EnrollmentsKidsService } from './enrollments_kids.service';
import { EnrollmentsKidsController } from './enrollments_kids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsKid } from './entities/enrollments_kid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentsKid])],
  controllers: [EnrollmentsKidsController],
  providers: [EnrollmentsKidsService],
})
export class EnrollmentsKidsModule {}
