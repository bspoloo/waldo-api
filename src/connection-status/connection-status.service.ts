import { ConnectionStatusDto } from './dto/create-connection-status.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionStatus } from './entities/connection-status.entity';

@Injectable()
export class ConnectionStatusService {
  constructor(
    @InjectRepository(ConnectionStatus)
    private readonly connectionStatusRepository: Repository<ConnectionStatus>,
  ) {}

  async updateConnectionStatus(dto: ConnectionStatusDto): Promise<void> {
    const newStatus = this.connectionStatusRepository.create(dto);
    await this.connectionStatusRepository.save(newStatus);
  }

  async getConnectionStatus(userId: string): Promise<ConnectionStatus[]> {
    return this.connectionStatusRepository.find({
      where: { userId },
      order: { lastChecked: 'DESC' },
    });
  }

  async getLatestConnectionStatus(userId: string): Promise<ConnectionStatus> {
    const [latestStatus] = await this.connectionStatusRepository.find({
      where: { userId },
      order: { lastChecked: 'DESC' },
      take: 1,
    });

    if (!latestStatus) {
      throw new HttpException(
        `No connection status found for user ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return latestStatus;
  }
}
