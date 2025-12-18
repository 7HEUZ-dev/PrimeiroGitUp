import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
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
  buscarPorId(@Param('id') id: number) {
    return this.padariasService.buscarPorId(id);
  }

  @Get('dono/:donoId')
  buscarPorDono(@Param('donoId') donoId: number) {
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
}
