import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDataLocationDto } from './dto/create-data-location.dto';
import { UpdateDataLocationDto } from './dto/update-data-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLocation } from './entities/data-location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataLocationsService {
  constructor(@InjectRepository(DataLocation) private locationDataRepository: Repository<DataLocation>) {}

  async getAll(): Promise<DataLocation[]> {
    return await this.locationDataRepository.find();
  }

  async getLastByIdKid(id: number): Promise<DataLocation> {
    try {
      const dataLocation = await this.locationDataRepository.find({
        order: { created_at: 'DESC' },
        take: 1
      });

      if (dataLocation.length === 0) {
        throw new Error('No se encontraron ubicaciones de datos.');
      }
      return dataLocation[0];

    } catch (err) {
      console.log('Get last DataLocation by id error: ', err.message ?? err);
      throw new HttpException(
        `DataLocation with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  
  async create(dataLocationDto: CreateDataLocationDto): Promise<DataLocation> {
    console.log('Data received in DTO:', dataLocationDto);
    const dataLocationEntity = this.locationDataRepository.create(dataLocationDto);
    return await this.locationDataRepository.save(dataLocationEntity);
}
  async delete(id: number): Promise<number> {
    const foundDataLocation = await this.locationDataRepository.findOneBy({
      id: id,
    });

    if (!foundDataLocation) {
      throw new HttpException(
        `DataLocation with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.locationDataRepository.delete(id);
    return foundDataLocation.id;
  }
}
