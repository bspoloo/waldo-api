import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('kids')
export class KidsController {
  constructor(
    private readonly kidsService: KidsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createKidDto: CreateKidDto) {
    const newKid = await this.kidsService.create(createKidDto);
  
    if (!newKid) {
      // Si el usuario ya existe, genera un token para el usuario existente
      const token = await this.authService.createJwtToken(createKidDto);
      console.log('Generated JWT for existing user:', token);
      return { token }; // Solo retorna el token
    }
  
    // Si el usuario fue creado exitosamente, genera el token normalmente
    const token = await this.authService.createJwtToken(createKidDto);
    console.log('Generated JWT:', token);
    return { newKid, token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.kidsService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kidsService.getOneById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid'])
  @Get('code/:id')
  findOneCode(@Param('id') id: string) {
    return this.kidsService.getCodeById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    return this.kidsService.update(+id, updateKidDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidsService.delete(+id);
  }
}
