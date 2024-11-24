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
    const validStatuses = {
        "Sin conexión": "Sin conexión",
        "Sin acceso a internet": "Sin acceso a internet",
        "Internet disponible": "Internet disponible",
    };

    const mappedStatus = validStatuses[dto.connectionStatus];
    if (!mappedStatus) {
        console.error(`Estado de conexión inválido: ${dto.connectionStatus}`);
        throw new HttpException(
            `Estado de conexión inválido: ${dto.connectionStatus}`,
            HttpStatus.BAD_REQUEST,
        );
    }

    dto.connectionStatus = mappedStatus;

    const newStatus = this.connectionStatusRepository.create(dto);
    console.log('Guardando nuevo estado de conexión:', newStatus);
    await this.connectionStatusRepository.save(newStatus);
    console.log('Nuevo estado de conexión guardado correctamente.');
}

  async getLatestConnectionStatus(userId: string): Promise<ConnectionStatus> {
    console.log(`Fetching latest connection status for userId: ${userId}`);
    try {
      const [latestStatus] = await this.connectionStatusRepository.find({
        where: { userId },
        order: { lastChecked: 'DESC' },
        take: 1,
      });

      if (!latestStatus) {
        console.warn(`No connection status found for userId: ${userId}`);
        throw new HttpException(
          `No connection status found for user ${userId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      console.log('Fetched latest connection status:', latestStatus);
      return latestStatus;
    } catch (error) {
      console.error('Error fetching latest connection status:', error);
      throw new HttpException('Failed to fetch connection status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getConnectionStatus(userId: string): Promise<ConnectionStatus[]> {
    console.log(`Fetching connection status history for userId: ${userId}`);
    try {
      const statusList = await this.connectionStatusRepository.find({
        where: { userId },
        order: { lastChecked: 'DESC' },
      });
      console.log(`Fetched ${statusList.length} connection status records for userId: ${userId}`);
      return statusList;
    } catch (error) {
      console.error('Error fetching connection status history:', error);
      throw new HttpException('Failed to fetch connection status history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

