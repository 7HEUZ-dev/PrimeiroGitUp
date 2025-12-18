import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceiroService } from './financeiro.service';
import { CobrancaService } from './cobranca.service';
import { FinanceiroController } from './financeiro.controller';
import { Gasto } from './gasto.entity';
import { Pedido } from '../pedidos/pedido.entity';
import { DetalhePedido } from '../pedidos/detalhe-pedido.entity';
import { Padaria } from '../padarias/padaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto, Pedido, DetalhePedido, Padaria])],
  providers: [FinanceiroService, CobrancaService],
  controllers: [FinanceiroController],
  exports: [FinanceiroService, CobrancaService],
})
export class FinanceiroModule {}
