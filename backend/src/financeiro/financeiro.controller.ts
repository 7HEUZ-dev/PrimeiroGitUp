import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { CobrancaService } from './cobranca.service';
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';
import { FuncaoUsuario } from '../usuarios/usuario.entity';
import { CriarGastoDto } from './dto/criar-gasto.dto';

@Controller('financeiro')
export class FinanceiroController {
  constructor(
    private readonly financeiroService: FinanceiroService,
    private readonly cobrancaService: CobrancaService,
  ) {}

  @Post('gastos/:padariaId')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  criarGasto(
    @Param('padariaId', ParseIntPipe) padariaId: number,
    @Body() dados: CriarGastoDto,
  ) {
    return this.financeiroService.criarGasto(dados, padariaId);
  }

  @Get('gastos/:padariaId')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  listarGastos(@Param('padariaId', ParseIntPipe) padariaId: number) {
    return this.financeiroService.listarGastos(padariaId);
  }

  @Get('vendas/:padariaId')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  listarVendas(@Param('padariaId', ParseIntPipe) padariaId: number) {
    return this.financeiroService.listarVendas(padariaId);
  }

  @Get('balanco/:padariaId')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  obterBalanco(@Param('padariaId', ParseIntPipe) padariaId: number) {
    return this.financeiroService.balanco(padariaId);
  }

  @Get('fatura/:padariaId')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  obterFatura(@Param('padariaId', ParseIntPipe) padariaId: number) {
    return this.cobrancaService.calcularFatura(padariaId);
  }
}
