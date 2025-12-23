import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { PadariasService } from './padarias.service';
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';
import { FuncaoUsuario } from '../usuarios/usuario.entity';
import { CriarPadariaDto } from './dto/criar-padaria.dto';

@Controller('padarias')
export class PadariasController {
  constructor(private readonly padariasService: PadariasService) {}

  @Get()
  listarTodas() {
    return this.padariasService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.padariasService.buscarPorId(id);
  }

  @Get('dono/:donoId')
  buscarPorDono(@Param('donoId', ParseIntPipe) donoId: number) {
    return this.padariasService.buscarPorDono(donoId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  criar(
    @Body() dados: CriarPadariaDto,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    return this.padariasService.criar(dados, donoId);
  }

  @Post('atualizar')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  atualizar(
    @Body()
    dados: Partial<{
      endereco: string;
      ativo: boolean;
      descricao: string;
      nome: string;
    }>,
    @Req() req: { user: { userId: number } },
  ) {
    const donoId = req.user.userId;
    return this.padariasService.atualizarPorDono(donoId, dados as any);
  }
}
