import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { HistoryKidsService } from './history_kids.service';
import { CreateHistoryKidDto } from './dto/create-history_kid.dto';
import { UpdateHistoryKidDto } from './dto/update-history_kid.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('history-kids')
export class HistoryKidsController {
  constructor(private readonly historyKidsService: HistoryKidsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get()
  findAll() {
    return this.historyKidsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get(':id_Parent')
  findAllbyId(@Param('id_Parent') id_Parent: string) {
    return this.historyKidsService.findAllById(id_Parent);
  }
}
