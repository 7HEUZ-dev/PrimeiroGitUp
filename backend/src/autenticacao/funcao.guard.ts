import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FuncaoUsuario } from '../usuarios/usuario.entity';

export const FUNCOES_KEY = 'funcoes';
// Importante: O nome aqui deve ser 'Funcoes' exatamente como os controllers importam
export const Funcoes = (...funcoes: FuncaoUsuario[]) => SetMetadata(FUNCOES_KEY, funcoes);

@Injectable()
export class FuncaoGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const funcoesRequeridas = this.reflector.getAllAndOverride<FuncaoUsuario[]>(
      FUNCOES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!funcoesRequeridas) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('Funções Requeridas:', funcoesRequeridas);
    console.log('Função do Usuário:', user?.funcao);
    // Verifica se o id e a funcao existem no objeto user que o JWT Strategy injetou
    return user && user.funcao && funcoesRequeridas.includes(user.funcao);
  }
}