import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { DataLocationsModule } from './data-locations/data-locations.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CodesModule } from './codes/codes.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { EnrollmentsFathersModule } from './enrollments_fathers/enrollments_fathers.module';
import { ConnectionStatusModule } from './connection-status/connection-status.module';
import { EnrollmentsKidsModule } from './enrollments_kids/enrollments_kids.module';
import { HistoryKidsModule } from './history_kids/history_kids.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '../.env'
});

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    UsersModule,
    DataLocationsModule,
    AuthModule,
    CodesModule,
    EnrollmentsModule,
    EnrollmentsFathersModule,
    ConnectionStatusModule,
    EnrollmentsKidsModule,
    HistoryKidsModule
  ], 
})
export class AppModule {}
