import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentsFatherDto } from './dto/create-enrollments_father.dto';
import { UpdateEnrollmentsFatherDto } from './dto/update-enrollments_father.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentsFather } from './entities/enrollments_father.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsFathersService {

  constructor(@InjectRepository(EnrollmentsFather) private enrollmentFathersRepository: Repository<EnrollmentsFather>) {}

  async getAll(): Promise<EnrollmentsFather[]> {
    return await this.enrollmentFathersRepository.find();
  }

  async getAllforOneById(id_Kid: string): Promise<EnrollmentsFather[]> {
    try {
      return await this.enrollmentFathersRepository.find({
        where: {id_kid :id_Kid, isActive : true}
      });
    } catch (err) {
      console.log('Get one Enrollment by id error: ', err.message ?? err);
      throw new HttpException(
        `Enrollment with id ${id_Kid} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
