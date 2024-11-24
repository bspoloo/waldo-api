import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';
import { Enrollment } from './entities/enrollment.entity';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])  
  @Post()
  create(@Body() createEnrollments: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollments);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Get('linked/kids') // Prefijo estático
  async getLinkedKids(@User() user: CreateUserDto) {
    console.log('Parent ID:', user.id); // Depuración
    return this.enrollmentsService.getLinkedKids(user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid','parent']) 
  @Get()
  findAll() {
    return this.enrollmentsService.getAll();
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid', 'parent'])
  @Get(':id') 
  findOneById(@Param('id') id: number) {
    return this.enrollmentsService.getOneById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid','parent'])
  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEnrollmentDto: UpdateEnrollmentDto) : Promise<Enrollment> {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.delete(+id);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Delete('unlink/:id')
  unlinkEnrollment(@Param('id') id: number) {
    return this.enrollmentsService.unLinkEnrollment(+id);
  }

}
