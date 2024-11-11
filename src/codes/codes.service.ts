import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Repository } from 'typeorm';
import { Coder } from 'src/classes/coder';

@Injectable()
export class CodesService {
  private coder : Coder
  constructor(@InjectRepository(Code) private codeRepository: Repository<Code>) {
    this.coder = new Coder();
  }

  async getAll(): Promise<Code[]> {
    return await this.codeRepository.find();
  }

  async getLastCodeByIdKid(id_Kid: string): Promise<Code> {
    try {
      console.log("the id kid is: " + id_Kid);
      const code = await this.codeRepository.find({
        where: { id_User: id_Kid },
        order: { created_at: 'DESC' },
        take: 1
      });

      if (code.length === 0) {
        throw new Error('No se encontro al codigo de ese niño.');
      }
      return code[0];
    } catch (err) {
      console.log('Get last code by id error: ', err.message ?? err);
      throw new HttpException(
        `code with id ${id_Kid} not found for the las code.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getLastCodeByCoder(codeString: string): Promise<Code> {
    try {
      const code = await this.codeRepository.find({
        where: { code: codeString , isAvaible : true},
        order: { created_at: 'DESC' },
        take: 1
      });

      if (code.length === 0) {
        throw new Error('Codigo no encontrado o no disponible');
      }
      return code[0];
    } catch (err) {
      console.log('Get last code by coder: ', err.message ?? err);
      throw new HttpException(
        `code ${codeString} not found or expired`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(codeDto: CreateCodeDto): Promise<Code> {
    try {
      const existingCodes = await this.codeRepository.find({
        where: { id_User: codeDto.id_User },
        order: { created_at: 'DESC' },
        take: 1,
      });

      if (existingCodes.length > 0) {
        existingCodes[0].isAvaible = false;
        await this.codeRepository.save(existingCodes[0]);
      }

      codeDto.code = this.coder.generateCode(6)
      console.log('Create new code for the user:', codeDto);
      const codeEntity = this.codeRepository.create(codeDto);
      return await this.codeRepository.save(codeEntity);
    } catch (err) {
      console.error('Create a new code fail: ', err.message ?? err);
      throw new HttpException(
        `No se pudo crear el código para el usuario con id ${codeDto.id_User}.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
