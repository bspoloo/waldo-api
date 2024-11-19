import { Controller, Get, Post, Body, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { ConnectionStatusService } from './connection-status.service';
import { ConnectionStatusDto } from './dto/create-connection-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('connection-status')
export class ConnectionStatusController {
  constructor(private readonly connectionStatusService: ConnectionStatusService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid'])  
  @Post('update')
  async updateConnectionStatus(@Body() dto: ConnectionStatusDto) {
    return this.connectionStatusService.updateConnectionStatus(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])  
  @Get(':userId')
  async getConnectionStatus(@Param('userId') userId: string) {
    return this.connectionStatusService.getConnectionStatus(userId);
  }
}
