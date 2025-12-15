// backend/src/produtos/produtos.module.ts

import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { PadariasModule } from '../padarias/padarias.module'; // <--- NOVO IMPORT

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    AutenticacaoModule,
    PadariasModule, // <--- ADICIONE ESTA LINHA para resolver a injeção do PadariaRepository
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}