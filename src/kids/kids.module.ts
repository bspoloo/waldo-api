import { Module } from '@nestjs/common';
import { KidsService } from './kids.service';
import { KidsController } from './kids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kid } from './entities/kid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kid])],
  controllers: [KidsController],
  providers: [KidsService],
})
export class KidsModule {}
