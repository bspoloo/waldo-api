import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Kid } from './entities/kid.entity';
import { Repository } from 'typeorm';
import { Coder } from 'src/classes/coder';
import { CodeResponse } from 'src/interfaces/CodeResponde';

@Injectable()
export class KidsService {
  private coder;
  constructor(@InjectRepository(Kid) private kidRepository: Repository<Kid>) {
    this.coder = new Coder();
  }
  async getAll(): Promise<Kid[]> {
    return await this.kidRepository.find();
  }

  async getOneById(id: string): Promise<Kid> {
    try {
      return await this.kidRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log('Get one Kid by id error: ', err.message ?? err);
      throw new HttpException(
        `Kid with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async getCodeById(id: string): Promise<CodeResponse> {
    try {
      const kid = await this.kidRepository.findOneOrFail({
        where: { id: id },
      });
      return {code : kid.code} ;
    }
    catch (err) {
      console.log('Get the Code Kid by id error: ', err.message ?? err);
      throw new HttpException(
        `Kid with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(Kid: CreateKidDto): Promise<Kid> {
    try {
      console.log('Trying to create Kid with ID:', Kid.id);
      Kid.code = this.coder.generateCode(6);

      const existingKid = await this.kidRepository.findOne({
        where: { id: Kid.id },
      });
      if (existingKid) {
        throw new HttpException(
          `Kid with id ${Kid.id} already exists.`,
          HttpStatus.CONFLICT
        );
      }
      const createdKid = this.kidRepository.create(Kid);
      return await this.kidRepository.save(createdKid);
    }
    catch (err) {
      console.log('The kid already exist in database: ', err.message ?? err);
      throw new HttpException(
        `Failed to create Kid: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, Kid: UpdateKidDto): Promise<Kid> {
    let foundKid = await this.kidRepository.findOne({
      where: { id: Kid.id },
    });
    if (!foundKid) {
      throw new HttpException(
        `Kid with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundKid = { ...foundKid, ...Kid, updated_at: new Date() };
    return await this.kidRepository.save(foundKid);
  }

  async delete(id: number): Promise<String> {
    let foundKid = await this.kidRepository.findOne({
      where: { id: id.toString() },
    });

    if (!foundKid) {
      throw new HttpException(
        `Kid with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.kidRepository.delete(id);
    return foundKid.id;
  }
}
