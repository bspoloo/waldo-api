import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';
import { Cron } from '@nestjs/schedule';

@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid'])
  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.codesService.create(createCodeDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid'])
  @Get()
  findAll() {
    return this.codesService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get(':id')
  findCodeById(@Param('id') id: string) {
    return this.codesService.getLastCodeByIdKid(id);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Get('code/:code')
  findCodeByCoder(@Param('code') code: string) {
    return this.codesService.getLastCodeByCoder(code);
  }
}
