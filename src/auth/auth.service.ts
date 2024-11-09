import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    // Método para crear un token usando CreateKidDto
    async createJwtToken(kidData: CreateUserDto): Promise<string> {
        // Define el payload del token con los datos de CreateKidDto
        const payload = { 
            id: kidData.id,
            familyName: kidData.familyName,
            givenName: kidData.givenName,
            email: kidData.email,
            code: kidData.code,
            role: kidData.role
        };

        // Crea y devuelve el JWT
        return this.jwtService.sign(payload);
    }
}
