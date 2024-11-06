import { Module } from '@nestjs/common';
import { KidsService } from './kids.service';
import { KidsController } from './kids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kid } from './entities/kid.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kid]), AuthModule],
  controllers: [KidsController],
  providers: [KidsService],
})
export class KidsModule {}
