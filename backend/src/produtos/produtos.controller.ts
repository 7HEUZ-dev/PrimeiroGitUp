// backend/src/produtos/produtos.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
  Patch,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { FuncaoUsuario } from '../usuarios/usuario.entity';

// Imports de Segurança
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  // ------------------------------------
  // ROTAS PROTEGIDAS (GERENCIAMENTO - DONO DE PADARIA)
  // ------------------------------------

  // Rota: POST /produtos (Permitido apenas para Donos de Padaria)
  @Post()
  @UseGuards(AuthGuard('jwt'), FuncaoGuard) // 1. Verifica o token; 2. Verifica a função
  @Funcoes(FuncaoUsuario.DONO_PADARIA) // Apenas DONO_PADARIA pode acessar
  async criarProduto(
    @Body() dados: CriarProdutoDto,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    return this.produtosService.criarProduto(donoId, dados);
  }

  // ------------------------------------
  // ROTAS PÚBLICAS (CATÁLOGO - CLIENTE)
  // ------------------------------------

  // Rota: GET /produtos/catalogo (Buscar todos os produtos disponíveis)
  @Get('catalogo')
  async buscarCatalogo() {
    return this.produtosService.buscarCatalogo();
  }

  // Rota: GET /produtos/padaria/:padariaId (Buscar produtos de uma padaria específica)
  @Get('padaria/:padariaId')
  async buscarProdutosPorPadaria(@Param('padariaId') padariaId: string) {
    return this.produtosService.buscarProdutosPorPadaria(
      parseInt(padariaId, 10),
    );
  }

  // Pausar/retomar venda (disponibilidade)
  @Patch('disponivel/:id')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async atualizarDisponibilidade(
    @Param('id') id: string,
    @Body('disponivel') disponivel: boolean,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    return this.produtosService.atualizarDisponibilidade(
      donoId,
      parseInt(id, 10),
      Boolean(disponivel),
    );
  }

  // Atualizar dados do produto (preço, estoque, categoria, imagem, descricao, nome)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async atualizarProduto(
    @Param('id') id: string,
    @Body()
    dados: Partial<{
      nome: string;
      descricao: string;
      preco: number;
      estoque: number;
      categoria: string;
      imagemUrl: string;
      disponivel: boolean;
    }>,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    const updated = await this.produtosService.atualizarProduto(
      donoId,
      parseInt(id, 10),
      dados as any,
    );
    return updated;
  }
}
