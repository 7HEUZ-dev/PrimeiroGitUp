// backend/src/autenticacao/funcao.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FuncaoUsuario } from '../usuarios/usuario.entity';
import { SetMetadata } from '@nestjs/common';
import { JwtPayload } from './jwt.strategy';

// Decorator que será usado nas rotas para definir as permissões
export const FUNCOES_KEY = 'funcoes';
export const Funcoes = (...funcoes: FuncaoUsuario[]) =>
  SetMetadata(FUNCOES_KEY, funcoes); // Este import deve ser SetMetadata do '@nestjs/common'

@Injectable()
export class FuncaoGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const funcoesRequeridas = this.reflector.getAllAndOverride<FuncaoUsuario[]>(
      FUNCOES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!funcoesRequeridas) {
      return true; // Se nenhuma função for definida, permite acesso
    }

    const req = context
      .switchToHttp()
      .getRequest<{ user: JwtPayload & { sub: number } }>();
    const user = req.user;
    return funcoesRequeridas.some((funcao) => user.funcao === funcao);
  }
}
