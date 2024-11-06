import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataLocationsService } from './data-locations.service';
import { CreateDataLocationDto } from './dto/create-data-location.dto';
import { UpdateDataLocationDto } from './dto/update-data-location.dto';

@Controller('data-locations')
export class DataLocationsController {
  constructor(private readonly dataLocationsService: DataLocationsService) {}

  @Post()
  create(@Body() createDataLocationDto: CreateDataLocationDto) {
    return this.dataLocationsService.create(createDataLocationDto);
  }

  @Get()
  findAll() {
    return this.dataLocationsService.getAll();
  }

  @Get(':id_Kid')
  findLastByKid(@Param('id_Kid') id_Kid: string) {
    console.log("the id kid is: "+id_Kid);
    return this.dataLocationsService.getLastByIdKid(id_Kid);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLocationsService.delete(+id);
  }
}
