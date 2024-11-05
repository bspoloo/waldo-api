import { Module } from '@nestjs/common';
import { DataLocationsService } from './data-locations.service';
import { DataLocationsController } from './data-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLocation } from './entities/data-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataLocation])],
  controllers: [DataLocationsController],
  providers: [DataLocationsService],
})
export class DataLocationsModule {}
