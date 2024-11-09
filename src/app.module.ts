import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { DataLocationsModule } from './data-locations/data-locations.module';

import { AuthModule } from './auth/auth.module';
import { KidsModule } from './kids/kids.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env'
});

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    KidsModule,
    DataLocationsModule,
    AuthModule
  ], 
})
export class AppModule {}
