import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Coder } from 'src/classes/coder';
import { CodeResponse } from 'src/interfaces/CodeResponde';

@Injectable()
export class UsersService {
  private coder;
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    this.coder = new Coder();
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log('Get one User by id error: ', err.message ?? err);
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getCodeById(id: string): Promise<CodeResponse> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: id },
      });
      return { code: user.code };
    } catch (err) {
      console.log('Get the Code User by id error: ', err.message ?? err);
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(user: CreateUserDto): Promise<User | null> {
    try {
      console.log('Trying to create User with ID:', user.id);
      user.code = this.coder.generateCode(6);

      const existingUser = await this.userRepository.findOne({
        where: { id: user.id },
      });

      if (existingUser) {
        console.log(`User with id ${user.id} already exists.`);
        return null; // Usuario ya existe, devolvemos null
      }

      const createdUser = this.userRepository.create(user);
      return await this.userRepository.save(createdUser);
    } catch (err) {
      console.log('Failed to create User: ', err.message ?? err);
      throw new HttpException(
        `Failed to create User: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    let foundUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!foundUser) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundUser = { ...foundUser, ...user, updated_at: new Date() };
    return await this.userRepository.save(foundUser);
  }

  async delete(id: number): Promise<string> {
    let foundUser = await this.userRepository.findOne({
      where: { id: id.toString() },
    });

    if (!foundUser) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.delete(id);
    return foundUser.id;
  }
}
