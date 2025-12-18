import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario, FuncaoUsuario } from '../usuarios/usuario.entity';
import { Padaria } from '../padarias/padaria.entity';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Padaria)
    private padariaRepository: Repository<Padaria>, // Injetar PadariaRepo
    private jwtService: JwtService,
  ) {}

  // ------------------------------------
  // Lógica de Registro (Clientes e Donos)
  // ------------------------------------
  async registrar(dados: RegistroDto, funcao: FuncaoUsuario): Promise<Usuario> {
    const { nome, email, senha, endereco, nomePadaria } = dados;

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
      funcao,
    });

    const usuarioSalvo = await this.usuariosRepository.save(novoUsuario);

    // 4. Se for DONO, criar a Padaria Automaticamente
    if (funcao === FuncaoUsuario.DONO_PADARIA) {
      if (!nomePadaria) {
        throw new BadRequestException(
          'Nome da padaria é obrigatório para cadastro de dono.',
        );
      }
      const novaPadaria = this.padariaRepository.create({
        nome: nomePadaria,
        endereco: endereco, // Usa o mesmo endereço do dono por enquanto
        dono: usuarioSalvo,
      });
      await this.padariaRepository.save(novaPadaria);
    }

    return usuarioSalvo;
  }

  // ------------------------------------
  // Lógica de Login
  // ------------------------------------
  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<{
    id: number;
    nome: string;
    email: string;
    funcao: FuncaoUsuario;
  } | null> {
    const usuario = await this.usuariosRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('usuario.email = :email', { email })
      .getOne();

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const { id, nome, email: em, funcao } = usuario;
      return { id, nome, email: em, funcao };
    }
    return null;
  }

  async login(dados: LoginDto) {
    const usuario = await this.validarUsuario(dados.email, dados.senha);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    let padariaId: number | null = null;
    if (usuario.funcao === FuncaoUsuario.DONO_PADARIA) {
      const padaria = await this.padariaRepository.findOne({
        where: { dono: { id: usuario.id } },
      });
      if (padaria) {
        padariaId = padaria.id;
      }
    }

    // Cria o JWT Payload
    const payload = {
      email: usuario.email,
      sub: usuario.id,
      funcao: usuario.funcao,
      padariaId, // Inclui ID da padaria no token se houver
    };

    // Retorna o token de acesso e o perfil do usuário
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        funcao: usuario.funcao,
        padariaId,
      },
    };
  }
}
