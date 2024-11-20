import { Module } from '@nestjs/common';
import { ConnectionStatusService } from './connection-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionStatusController } from './connection-status.controller';
import { ConnectionStatus } from './entities/connection-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionStatus])],
  controllers: [ConnectionStatusController],
  providers: [ConnectionStatusService],
})
export class ConnectionStatusModule {}
