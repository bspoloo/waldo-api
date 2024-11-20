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
    await this.connectionStatusService.updateConnectionStatus(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent']) // Solo los padres pueden obtener el último estado
  @Get(':userId/latest')
  async getLatestConnectionStatus(@Param('userId') userId: string) {
    return this.connectionStatusService.getLatestConnectionStatus(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent']) // Solo los padres pueden obtener el historial completo
  @Get(':userId')
  async getConnectionStatus(@Param('userId') userId: string) {
    return this.connectionStatusService.getConnectionStatus(userId);
  }
}
