import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDataLocationDto } from './dto/create-data-location.dto';
import { UpdateDataLocationDto } from './dto/update-data-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLocation } from './entities/data-location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataLocationsService {
  constructor(@InjectRepository(DataLocation) private locationDataRepository: Repository<DataLocation>) {

  }
  async getAll(): Promise<DataLocation[]> {
    return await this.locationDataRepository.find();
  }

  async getLastByIdKid(id_Kid: string): Promise<DataLocation> {
    try {
      console.log("the id kid is: "+id_Kid);
      
      const dataLocation = await this.locationDataRepository.find({
        where: {id_Kid :id_Kid},
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
        `DataLocation with id ${id_Kid} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(DataLocation: CreateDataLocationDto): Promise<DataLocation> {
    const createdDataLocation = this.locationDataRepository.create(DataLocation);
    return await this.locationDataRepository.save(createdDataLocation);
  }

  async delete(id: number): Promise<number> {
    let foundDataLocation = await this.locationDataRepository.findOneBy({
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
