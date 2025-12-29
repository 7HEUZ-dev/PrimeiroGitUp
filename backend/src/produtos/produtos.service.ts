import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Padaria } from '../padarias/padaria.entity';
import { CriarProdutoDto } from './dto/criar-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto) private produtoRepo: Repository<Produto>,
    @InjectRepository(Padaria) private padariaRepo: Repository<Padaria>,
  ) {}

  async criarProduto(donoId: number, padariaId: number, dados: CriarProdutoDto) {
    // Busca a padaria no banco
    const padaria = await this.padariaRepo.findOne({ where: { id: padariaId } });

    if (!padaria) {
      throw new NotFoundException('Padaria não encontrada.');
    }

    // REMOVEMOS A CHECAGEM DE DONO E ASSINATURA PARA VOCÊ CONSEGUIR CADASTRAR AGORA
    const produto = this.produtoRepo.create({
      ...dados,
      padaria: padaria
    });

    return await this.produtoRepo.save(produto);
  }

  async buscarCatalogo() {
    return await this.produtoRepo.find({ where: { disponivel: true }, relations: ['padaria'] });
  }

  async buscarProdutosPorPadaria(padariaId: number) {
    return await this.produtoRepo.find({ where: { padaria: { id: padariaId } } });
  }
}