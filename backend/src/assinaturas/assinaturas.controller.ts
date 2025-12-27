import { Controller, Get, Patch, UseGuards, Req } from '@nestjs/common';
import { AssinaturasService } from './assinaturas.service';
import { AuthGuard } from '@nestjs/passport';
import { Funcoes, FuncaoGuard } from '../autenticacao/funcao.guard';
import { FuncaoUsuario } from '../usuarios/usuario.entity';

@Controller()
export class AssinaturasController {
  constructor(private readonly assinaturasService: AssinaturasService) {}

  @Get('assinatura/minha')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async minha(@Req() req: { user: { padariaId: number } }) {
    return this.assinaturasService.verificarVencimento(req.user.padariaId);
  }

  @Patch('assinatura/confirmar-pagamento')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async confirmar(@Req() req: { user: { padariaId: number } }) {
    return this.assinaturasService.renovar(req.user.padariaId);
  }

  @Get('planos')
  @UseGuards(AuthGuard('jwt'), FuncaoGuard)
  @Funcoes(FuncaoUsuario.DONO_PADARIA)
  async planos() {
    return this.assinaturasService.listarPlanos();
  }
}
