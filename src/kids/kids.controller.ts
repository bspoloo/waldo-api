import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService,
              private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createKidDto: CreateKidDto) {
      const newKid = await this.kidsService.create(createKidDto);

      // Generar token JWT con los datos de createKidDto
      const token = await this.authService.createJwtToken(createKidDto);
      console.log('Generated JWT:', token);

      return { newKid, token };
  }

  @Get()
  findAll() {
    return this.kidsService.getAll();
  }

  @SetMetadata('roles', ['parent']) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kidsService.getOneById(id);
  }

  @SetMetadata('roles', ['kid'])  
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

  @Get(':id/token')
  async getToken(@Param('id') id: string) {
      const kid = await this.kidsService.getOneById(id);
      if (!kid) {
          return { error: 'Kid not found' };
      }
  
      // Genera un nuevo JWT usando los datos del niño
      const token = await this.authService.createJwtToken({
          id: kid.id,
          familyName: kid.familyName,
          givenName: kid.givenName,
          email: kid.email,
          code: kid.code,
          role: kid.role
      });
      console.log('Bearer:', token);
  
      return { token };
  }  
}
