import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KidsModule } from './kids/kids.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { DataLocationsModule } from './data-locations/data-locations.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '../.env'
});

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    KidsModule,
    DataLocationsModule,
  ]
})
export class AppModule {}
