import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectionStatus } from './entities/connection-status.entity';
import { ConnectionStatusDto } from './dto/create-connection-status.dto';

@Injectable()
export class ConnectionStatusService {
  constructor(
    @InjectRepository(ConnectionStatus)
    private connectionStatusRepository: Repository<ConnectionStatus>,
  ) {}
  async updateConnectionStatus(dto: ConnectionStatusDto): Promise<ConnectionStatus> {
    const newStatus = this.connectionStatusRepository.create(dto);
    return await this.connectionStatusRepository.save(newStatus);
}

  async getConnectionStatus(userId: string): Promise<ConnectionStatus> {
    return this.connectionStatusRepository.findOne({ where: { userId } });
  }
}
