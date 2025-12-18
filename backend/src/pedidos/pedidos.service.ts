import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, StatusPedido } from './pedido.entity';
import { DetalhePedido } from './detalhe-pedido.entity';
import { Produto } from '../produtos/produto.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Padaria } from '../padarias/padaria.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
    @InjectRepository(DetalhePedido)
    private detalheRepo: Repository<DetalhePedido>,
    @InjectRepository(Padaria)
    private padariaRepo: Repository<Padaria>,
  ) {}

  async criarPedido(dados: {
    clienteId: number;
    padariaId: number;
    enderecoEntrega: string;
    itens: { produtoId: number; quantidade: number }[];
  }) {
    const { clienteId, padariaId, enderecoEntrega, itens } = dados;

    // 1. Validar Estoque e Calcular Total
    let valorTotal = 0;
    const detalhesParaSalvar: DetalhePedido[] = [];

    // Precisamos iterar com async para buscar produtos, ou buscar todos de uma vez
    for (const item of itens) {
      const produto = await this.produtoRepo.findOne({
        where: { id: item.produtoId },
      });
      if (!produto) {
        throw new BadRequestException(
          `Produto ${item.produtoId} não encontrado.`,
        );
      }
      if (produto.estoque < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto ${produto.nome}. Disponível: ${produto.estoque}`,
        );
      }

      valorTotal += Number(produto.preco) * item.quantidade;

      // Criar o objeto detalhe (ainda sem o pedido ID, que será criado)
      const detalhe = new DetalhePedido();
      detalhe.produto = produto;
      detalhe.quantidade = item.quantidade;
      detalhe.precoUnitario = produto.preco;
      detalhesParaSalvar.push(detalhe);

      // Atualizar estoque e total vendido (Na memória, depois salvamos)
      produto.estoque -= item.quantidade;
      produto.totalVendido += item.quantidade;
      await this.produtoRepo.save(produto); // Salvar atualização do produto
    }

    // 2. Criar Pedido
    const pedido = this.pedidoRepo.create({
      cliente: { id: clienteId } as Usuario,
      padaria: { id: padariaId } as Padaria,
      enderecoEntrega,
      valorTotal,
      status: StatusPedido.PENDENTE,
      itens: detalhesParaSalvar,
    });

    return this.pedidoRepo.save(pedido);
  }

  async listarPedidosPorPadaria(padariaId: number) {
    return this.pedidoRepo.find({
      where: { padaria: { id: padariaId } },
      relations: ['cliente', 'itens', 'itens.produto'],
      order: { dataPedido: 'DESC' },
    });
  }

  async listarPedidosPorCliente(clienteId: number) {
    return this.pedidoRepo.find({
      where: { cliente: { id: clienteId } },
      relations: ['padaria', 'itens', 'itens.produto'],
      order: { dataPedido: 'DESC' },
    });
  }

  async atualizarStatus(pedidoId: number, status: StatusPedido) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: pedidoId },
      relations: ['padaria'],
    });
    if (!pedido) throw new BadRequestException('Pedido não encontrado');

    // Se o pedido for entregue, incrementa contador da padaria
    if (
      status === StatusPedido.ENTREGUE &&
      pedido.status !== StatusPedido.ENTREGUE
    ) {
      const padaria = pedido.padaria;
      padaria.entregasNoMes += 1;
      await this.padariaRepo.save(padaria);
    }

    await this.pedidoRepo.update(pedidoId, { status });
    return this.pedidoRepo.findOne({ where: { id: pedidoId } });
  }
}
