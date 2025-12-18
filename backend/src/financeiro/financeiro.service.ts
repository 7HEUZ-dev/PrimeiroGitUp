import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gasto } from './gasto.entity';
import { Pedido, StatusPedido } from '../pedidos/pedido.entity';
import { DetalhePedido } from '../pedidos/detalhe-pedido.entity';
import { Padaria } from '../padarias/padaria.entity';

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectRepository(Gasto)
    private gastoRepo: Repository<Gasto>,
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(DetalhePedido)
    private detalheRepo: Repository<DetalhePedido>,
  ) {}

  async criarGasto(dados: Partial<Gasto>, padariaId: number): Promise<Gasto> {
    const gasto = this.gastoRepo.create({
      ...dados,
      padaria: { id: padariaId } as Padaria,
    });
    return this.gastoRepo.save(gasto);
  }

  async listarGastos(padariaId: number) {
    const gastos = await this.gastoRepo.find({
      where: { padaria: { id: padariaId } },
    });
    const total = gastos.reduce(
      (acc, curr) => acc + Number(curr.valorTotal),
      0,
    );
    return { gastos, total };
  }

  async listarVendas(padariaId: number) {
    // Busca pedidos finalizados/entregues da padaria
    const pedidos = await this.pedidoRepo.find({
      where: {
        padaria: { id: padariaId },
        status: StatusPedido.ENTREGUE, // Considerar apenas entregues como venda concretizada? Ou todos confirmados? O usuário disse "vendeu... um bolo". Vou considerar entregue por enquanto ou criar um status 'CONFIRMADO'.
      },
      relations: ['itens', 'itens.produto'],
    });

    let totalVendas = 0;
    const itensVendidos: any[] = [];

    pedidos.forEach((pedido) => {
      pedido.itens.forEach((item) => {
        const valorItem = Number(item.precoUnitario) * item.quantidade;
        totalVendas += valorItem;
        itensVendidos.push({
          produto: item.produto.nome,
          quantidade: item.quantidade,
          valor: valorItem,
          data: pedido.dataPedido,
        });
      });
    });

    return { itensVendidos, totalVendas };
  }

  async balanco(padariaId: number) {
    const gastos = await this.listarGastos(padariaId);
    const vendas = await this.listarVendas(padariaId);

    return {
      gastos: gastos.total,
      vendas: vendas.totalVendas,
      lucroLiquido: vendas.totalVendas - gastos.total,
    };
  }
}
