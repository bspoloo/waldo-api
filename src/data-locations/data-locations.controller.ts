import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { DataLocationsService } from './data-locations.service';
import { CreateDataLocationDto } from './dto/create-data-location.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('data-locations')
export class DataLocationsController {
  constructor(private readonly dataLocationsService: DataLocationsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid'])  
  @Post()
  create(@Body() createDataLocationDto: CreateDataLocationDto) {
    return this.dataLocationsService.create(createDataLocationDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent']) 
  @Get()
  findAll() {
    return this.dataLocationsService.getAll();
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent']) 
  @Get('history/:id_Kid')
  findAllByIdKid(@Param('id_Kid') id_Kid: string) {
    return this.dataLocationsService.getAllByIdKid(id_Kid);
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Get(':id')
  findLastByKid(@Param('id') id: string) {
    return this.dataLocationsService.getLastByIdKid(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLocationsService.delete(+id);
  }
}
