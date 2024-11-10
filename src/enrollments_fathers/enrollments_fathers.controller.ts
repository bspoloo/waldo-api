import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { EnrollmentsFathersService } from './enrollments_fathers.service';
import { CreateEnrollmentsFatherDto } from './dto/create-enrollments_father.dto';
import { UpdateEnrollmentsFatherDto } from './dto/update-enrollments_father.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('enrollments-fathers')
export class EnrollmentsFathersController {
  constructor(private readonly enrollmentsFathersService: EnrollmentsFathersService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get()
  findAll() {
    return this.enrollmentsFathersService.getAll();
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get(':id_Kid')
  findAllForOne(@Param('id_Kid') id_Kid: string) {
    return this.enrollmentsFathersService.getAllforOneById(id_Kid);
  }
}
