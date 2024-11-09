import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/RolesGuard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createKidDto: CreateUserDto) {
    const newKid = await this.usersService.create(createKidDto);
  
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
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['parent'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getOneById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['kid'])
  @Get('code/:id')
  findOneCode(@Param('id') id: string) {
    return this.usersService.getCodeById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateUserDto) {
    return this.usersService.update(+id, updateKidDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
