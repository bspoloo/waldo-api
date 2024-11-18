import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CodesController } from './codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from 'src/codes/entities/code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code]),
  ScheduleModule.forRoot()],
  controllers: [CodesController],
  providers: [CodesService],
})
export class CodesModule { }
