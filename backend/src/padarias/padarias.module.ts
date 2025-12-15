// backend/src/padarias/padarias.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Padaria } from './padaria.entity'; // Importa a entidade Padaria

@Module({
  imports: [TypeOrmModule.forFeature([Padaria])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule], // <--- ESSENCIAL: Exporta o repositório
})
export class PadariasModule {}