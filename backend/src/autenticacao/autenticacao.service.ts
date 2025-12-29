import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
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
    private padariaRepository: Repository<Padaria>,
    private jwtService: JwtService,
  ) {}

  async registrar(dados: RegistroDto, funcao: FuncaoUsuario): Promise<Usuario> {
    const { nome, email, senha, endereco, nomePadaria } = dados;

    const usuarioExistente = await this.usuariosRepository.findOneBy({ email });
    if (usuarioExistente) {
      throw new BadRequestException('Email já está em uso.');
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    // 1. Criar o Usuário
    const novoUsuario = this.usuariosRepository.create({
      nome,
      email,
      senha: hashSenha,
      endereco,
      funcao,
    });
    
    const usuarioSalvo = await this.usuariosRepository.save(novoUsuario);

    // 2. Se for DONO, criar a Padaria vinculada
    if (funcao === FuncaoUsuario.DONO_PADARIA) {
      if (!nomePadaria) {
        // Se falhar o nome da padaria, removemos o usuário para não poluir o banco
        await this.usuariosRepository.remove(usuarioSalvo);
        throw new BadRequestException('Nome da padaria é obrigatório para donos.');
      }

      const novaPadaria = this.padariaRepository.create({
        nome: nomePadaria,
        endereco: endereco || 'Endereço não informado',
        dono: usuarioSalvo,
        ativo: true,
        plano: 'BASICO'
      });

      await this.padariaRepository.save(novaPadaria);
    }

    return usuarioSalvo;
  }

  async login(dados: LoginDto) {
    const usuario = await this.usuariosRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('usuario.email = :email', { email: dados.email })
      .getOne();

    if (!usuario || !(await bcrypt.compare(dados.senha, usuario.senha))) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    let padariaId: number | null = null;
    if (usuario.funcao === FuncaoUsuario.DONO_PADARIA) {
      const padaria = await this.padariaRepository.findOne({
        where: { dono: { id: usuario.id } },
      });
      padariaId = padaria ? padaria.id : null;
    }

    const payload = { 
      email: usuario.email, 
      sub: usuario.id, 
      funcao: usuario.funcao, 
      padariaId 
    };

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