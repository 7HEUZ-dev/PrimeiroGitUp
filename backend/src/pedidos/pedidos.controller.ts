import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { StatusPedido } from './pedido.entity';
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';
import { FuncaoUsuario } from '../usuarios/usuario.entity';
import { CriarPedidoDto } from './dto/criar-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.CLIENTE)
  criarPedido(@Body() dados: CriarPedidoDto) {
    return this.pedidosService.criarPedido(dados);
  }

  @Get('padaria/:padariaId')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  listarPorPadaria(@Param('padariaId') padariaId: number) {
    return this.pedidosService.listarPedidosPorPadaria(padariaId);
  }

  @Get('cliente/:clienteId')
  listarPorCliente(@Param('clienteId') clienteId: number) {
    return this.pedidosService.listarPedidosPorCliente(clienteId);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  atualizarStatus(
    @Param('id') id: number,
    @Body('status') status: StatusPedido,
  ) {
    return this.pedidosService.atualizarStatus(id, status);
  }
}
