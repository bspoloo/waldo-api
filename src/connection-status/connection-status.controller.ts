import { Controller, Get, Post, Body, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { ConnectionStatusService } from './connection-status.service';
import { ConnectionStatusDto } from './dto/create-connection-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('connection-status')
export class ConnectionStatusController {
  constructor(private readonly connectionStatusService: ConnectionStatusService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid']) // Solo los niños pueden actualizar el estado
  @Post('update')
  async updateConnectionStatus(@Body() dto: ConnectionStatusDto) {
    console.log('Update connection status endpoint hit. DTO:', dto);
    await this.connectionStatusService.updateConnectionStatus(dto);
    console.log('Connection status update processed successfully.');
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent']) // Solo los padres pueden obtener el último estado
  @Get(':userId/latest')
  async getLatestConnectionStatus(@Param('userId') userId: string) {
    console.log('Get latest connection status endpoint hit. userId:', userId);
    const result = await this.connectionStatusService.getLatestConnectionStatus(userId);
    console.log('Fetched latest connection status:', result);
    return result;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent']) // Solo los padres pueden obtener el historial completo
  @Get(':userId')
  async getConnectionStatus(@Param('userId') userId: string) {
    console.log('Get connection status history endpoint hit. userId:', userId);
    const result = await this.connectionStatusService.getConnectionStatus(userId);
    console.log('Fetched connection status history:', result);
    return result;
  }
}
