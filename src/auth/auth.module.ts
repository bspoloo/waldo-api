import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JwtStrategy';
import { AuthService } from './auth.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secreteKeyWaldo', // Scecret
            signOptions: { expiresIn: '1h' }, // Expiración del token
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService], 
})
export class AuthModule {}