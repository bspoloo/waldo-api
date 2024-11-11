import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsService {

  constructor(@InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>) {}

  async getAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find();
  }

  async getOneById(id: number): Promise<Enrollment> {
    try {
      return await this.enrollmentRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log('Get one Enrollment by id error: ', err.message ?? err);
      throw new HttpException(
        `Enrollment with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async create(enrollmentDto: CreateEnrollmentDto): Promise<Enrollment | null> {
    console.log('Data received in DTO:', enrollmentDto);

    const existingEnrollment = await this.enrollmentRepository.find({
      where: {id_User :enrollmentDto.id_User, id_Kid : enrollmentDto.id_Kid, isActive: true},
      order: { created_at: 'DESC' },
      take: 1
    });
    if(existingEnrollment.length > 0){
      existingEnrollment[0].isActive = false
      this.enrollmentRepository.save(existingEnrollment);
    }
    const enrollmentEntity = this.enrollmentRepository.create(enrollmentDto);
    return await this.enrollmentRepository.save(enrollmentEntity);
  }

  async update(id: number, enrollment: UpdateEnrollmentDto): Promise<Enrollment> {
    let foundEnrollment = await this.enrollmentRepository.findOne({
      where: { id: id },
    });
    if (!foundEnrollment) {
      throw new HttpException(
        `Enrollment with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundEnrollment = { ...foundEnrollment, ...enrollment, updated_at: new Date() };
    return await this.enrollmentRepository.save(foundEnrollment);
  }

  async delete(id: number): Promise<number> {
    let foundEnrollment = await this.enrollmentRepository.findOne({
      where: { id: id },
    });

    if (!foundEnrollment) {
      throw new HttpException(
        `Enrollment with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.enrollmentRepository.delete(id);
    return foundEnrollment.id;
  }
}
