import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadariasService } from './padarias.service';
import { PadariasController } from './padarias.controller';
import { Padaria } from './padaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Padaria])],
  providers: [PadariasService],
  controllers: [PadariasController],
  exports: [PadariasService],
})
export class PadariasModule {}
