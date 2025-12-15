// backend/src/autenticacao/autenticacao.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { FuncaoUsuario } from '../usuarios/usuario.entity';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  // Rota: POST /autenticacao/registro/cliente
  @Post('registro/cliente')
  async registrarCliente(@Body() dados: RegistroDto) {
    // Força a função para CLIENTE no registro
    dados.funcao = FuncaoUsuario.CLIENTE; 
    return this.autenticacaoService.registrar(dados, FuncaoUsuario.CLIENTE);
  }

  // Rota: POST /autenticacao/registro/dono
  @Post('registro/dono')
  async registrarDonoPadaria(@Body() dados: RegistroDto) {
    // Força a função para DONO_PADARIA no registro
    dados.funcao = FuncaoUsuario.DONO_PADARIA;
    return this.autenticacaoService.registrar(dados, FuncaoUsuario.DONO_PADARIA);
  }
  
  // Rota: POST /autenticacao/login
  @Post('login')
  async login(@Body() dados: LoginDto) {
    return this.autenticacaoService.login(dados);
  }
}