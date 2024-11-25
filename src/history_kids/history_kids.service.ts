import { Injectable } from '@nestjs/common';
import { CreateHistoryKidDto } from './dto/create-history_kid.dto';
import { UpdateHistoryKidDto } from './dto/update-history_kid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryKid } from './entities/history_kid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryKidsService {

  constructor(@InjectRepository(HistoryKid) private historyKidRepository: Repository<HistoryKid>) { }
  async findAll(): Promise<HistoryKid[]> {
    return await this.historyKidRepository.find();
  }

  async findAllById(id_Parent: string) : Promise<HistoryKid[]>{
    return await this.historyKidRepository.find(
      {where : {id_Parent : id_Parent},
      order: { created_at: 'DESC' },}
    );
  }
  
}
