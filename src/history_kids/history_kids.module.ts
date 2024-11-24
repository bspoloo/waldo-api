import { Module } from '@nestjs/common';
import { HistoryKidsService } from './history_kids.service';
import { HistoryKidsController } from './history_kids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryKid } from './entities/history_kid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryKid])],
  controllers: [HistoryKidsController],
  providers: [HistoryKidsService],
})
export class HistoryKidsModule {}
