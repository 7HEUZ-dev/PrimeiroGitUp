// backend/src/produtos/produtos.service.ts

import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { Padaria } from '../padarias/padaria.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    // Precisamos do repositório de Padaria para ligar o produto ao dono
    @InjectRepository(Padaria)
    private padariaRepository: Repository<Padaria>,
  ) {}

  // ------------------------------------
  // Funções para Donos de Padaria (Gerenciamento)
  // ------------------------------------

  async criarProduto(donoId: number, dados: CriarProdutoDto): Promise<Produto> {
    // 1. Encontra a Padaria associada ao Dono
    const padaria = await this.padariaRepository.findOne({
      where: { dono: { id: donoId } },
    });

    if (!padaria) {
      throw new UnauthorizedException(
        'Usuário não é dono de uma padaria registrada.',
      );
    }

    // 2. Cria o produto e associa à padaria
    const novoProduto = this.produtoRepository.create({
      ...dados,
      padaria: padaria,
    });

    return this.produtoRepository.save(novoProduto);
  }

  // ------------------------------------
  // Funções para Clientes (Catálogo)
  // ------------------------------------

  // Lista todos os produtos disponíveis de TODAS as padarias
  async buscarCatalogo(): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { disponivel: true, padaria: { ativo: true } },
      relations: ['padaria'], // Traz informações básicas da padaria
    });
  }

  // Lista os produtos de uma padaria específica
  async buscarProdutosPorPadaria(padariaId: number): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      where: { padaria: { id: padariaId }, disponivel: true },
      relations: ['padaria'],
    });

    if (!produtos || produtos.length === 0) {
      throw new NotFoundException(
        'Padaria não encontrada ou sem produtos disponíveis.',
      );
    }
    return produtos;
  }

  // Atualiza disponibilidade (pausar venda) garantindo que o produto é da padaria do dono
  async atualizarDisponibilidade(
    donoId: number,
    produtoId: number,
    disponivel: boolean,
  ): Promise<Produto> {
    const padaria = await this.padariaRepository.findOne({
      where: { dono: { id: donoId } },
    });
    if (!padaria) {
      throw new UnauthorizedException(
        'Usuário não é dono de uma padaria registrada.',
      );
    }
    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
      relations: ['padaria'],
    });
    if (!produto || produto.padaria.id !== padaria.id) {
      throw new UnauthorizedException('Produto não pertence à sua padaria.');
    }
    produto.disponivel = disponivel;
    return this.produtoRepository.save(produto);
  }

  async atualizarProduto(
    donoId: number,
    produtoId: number,
    dados: Partial<
      Pick<
        Produto,
        | 'nome'
        | 'descricao'
        | 'preco'
        | 'estoque'
        | 'categoria'
        | 'imagemUrl'
        | 'disponivel'
      >
    >,
  ): Promise<Produto> {
    const padaria = await this.padariaRepository.findOne({
      where: { dono: { id: donoId } },
    });
    if (!padaria) {
      throw new UnauthorizedException(
        'Usuário não é dono de uma padaria registrada.',
      );
    }
    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
      relations: ['padaria'],
    });
    if (!produto || produto.padaria.id !== padaria.id) {
      throw new UnauthorizedException('Produto não pertence à sua padaria.');
    }
    Object.assign(produto, dados);
    return this.produtoRepository.save(produto);
  }
}
