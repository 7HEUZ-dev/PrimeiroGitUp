import { Controller, Post, Body, UseGuards, Get, Req, Param } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { FuncaoUsuario } from '../usuarios/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async criarProduto(@Body() dados: CriarProdutoDto, @Req() req: any) {
    // Extraindo IDs do Token (conforme aparece no seu terminal)
    const donoId = req.user.userId || req.user.sub;
    const padariaId = req.user.padariaId;
    
    console.log(`Tentando cadastrar: Dono ${donoId}, Padaria ${padariaId}`);
    
    return this.produtosService.criarProduto(donoId, padariaId, dados);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async listarMeusProdutos(@Req() req: any) {
    return this.produtosService.buscarProdutosPorPadaria(req.user.padariaId);
  }

  @Get('catalogo')
  async buscarCatalogo() {
    return this.produtosService.buscarCatalogo();
  }
}