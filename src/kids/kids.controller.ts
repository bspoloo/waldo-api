import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService) {}

  @Post()
  create(@Body() createKidDto: CreateKidDto) {
    return this.kidsService.create(createKidDto);
  }

  @Get()
  findAll() {
    return this.kidsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kidsService.getOneById(id);
  }

  @Get('code/:id')
  findOneCode(@Param('id') id: string) {
    return this.kidsService.getCodeById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    return this.kidsService.update(+id, updateKidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidsService.delete(+id);
  }
}
