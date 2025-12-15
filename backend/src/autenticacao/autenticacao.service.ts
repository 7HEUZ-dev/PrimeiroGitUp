// backend/src/autenticacao/autenticacao.service.ts

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario, FuncaoUsuario } from '../usuarios/usuario.entity';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  // ------------------------------------
  // Lógica de Registro (Clientes e Donos)
  // ------------------------------------
  async registrar(dados: RegistroDto, funcao: FuncaoUsuario): Promise<Usuario> {
    const { nome, email, senha, endereco } = dados;

    // 1. Verifica se o usuário já existe
    const usuarioExistente = await this.usuariosRepository.findOneBy({ email });
    if (usuarioExistente) {
      throw new BadRequestException('Email já está em uso.');
    }

    // 2. Criptografa a senha (SALT de 10)
    const hashSenha = await bcrypt.hash(senha, 10);

    // 3. Cria e Salva o novo usuário
    const novoUsuario = this.usuariosRepository.create({
      nome,
      email,
      senha: hashSenha,
      endereco,
      funcao, // Define se é CLIENTE ou DONO_PADARIA
    });

    try {
      return await this.usuariosRepository.save(novoUsuario);
    } catch (error) {
      throw new BadRequestException('Erro ao salvar usuário no banco de dados.');
    }
  }

  // ------------------------------------
  // Lógica de Login
  // ------------------------------------
  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuariosRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha') // OBTÉM a senha que foi ocultada no entity
      .where('usuario.email = :email', { email })
      .getOne();

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      // Remove a senha do objeto antes de retornar
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...resultado } = usuario;
      return resultado;
    }
    return null;
  }

  async login(dados: LoginDto) {
    const usuario = await this.validarUsuario(dados.email, dados.senha);
    
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Cria o JWT Payload
    const payload = { 
      email: usuario.email, 
      sub: usuario.id, 
      funcao: usuario.funcao 
    };
    
    // Retorna o token de acesso e o perfil do usuário
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        funcao: usuario.funcao,
      }
    };
  }
}