import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { EnrollmentsKidsService } from './enrollments_kids.service';
import { CreateEnrollmentsKidDto } from './dto/create-enrollments_kid.dto';
import { UpdateEnrollmentsKidDto } from './dto/update-enrollments_kid.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('enrollments-kids')
export class EnrollmentsKidsController {
  constructor(private readonly enrollmentsKidsService: EnrollmentsKidsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get()
  findAll() {
    return this.enrollmentsKidsService.getAll();
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get(':id_Parent')
  findAllForOne(@Param('id_Parent') id_Parent: string) {
    return this.enrollmentsKidsService.getAllforOneById(id_Parent);
  }
}
