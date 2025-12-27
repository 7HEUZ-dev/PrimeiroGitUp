import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './pedido.entity';
import { DetalhePedido } from './detalhe-pedido.entity';
import { Produto } from '../produtos/produto.entity';
import { Padaria } from '../padarias/padaria.entity';
import { AssinaturasModule } from '../assinaturas/assinaturas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, DetalhePedido, Produto, Padaria]),
    AssinaturasModule,
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosService],
})
export class PedidosModule {}
