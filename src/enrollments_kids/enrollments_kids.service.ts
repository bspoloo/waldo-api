import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentsKidDto } from './dto/create-enrollments_kid.dto';
import { UpdateEnrollmentsKidDto } from './dto/update-enrollments_kid.dto';
import { EnrollmentsKid } from './entities/enrollments_kid.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsKidsService {

  constructor(@InjectRepository(EnrollmentsKid) private enrollmentKidsRepository: Repository<EnrollmentsKid>) { }

  async getAll(): Promise<EnrollmentsKid[]> {
    return await this.enrollmentKidsRepository.find();
  }

  async getAllforOneById(id_Parent: string): Promise<EnrollmentsKid[]> {
    try {
      console.log("Parent id es: "+id_Parent);
      
      return await this.enrollmentKidsRepository.find({
        where: { id_Parent: id_Parent }
      });
    } catch (err) {
      console.log('Get all for one Enrollment by id error: ', err.message ?? err);
      throw new HttpException(
        `Enrollment with id ${id_Parent} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
