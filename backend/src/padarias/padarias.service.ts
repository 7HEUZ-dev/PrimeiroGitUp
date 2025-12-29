import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Padaria } from './padaria.entity';
import { CriarPadariaDto } from './dto/criar-padaria.dto';
import { AtualizarConfiguracoesDto } from './dto/atualizar-configuracoes.dto';

@Injectable()
export class PadariasService {
  constructor(
    @InjectRepository(Padaria)
    private padariaRepo: Repository<Padaria>,
  ) {}

  async listarTodas() {
    return await this.padariaRepo.find();
  }

  async buscarPorId(id: number) {
    const padaria = await this.padariaRepo.findOne({ where: { id }, relations: ['dono'] });
    if (!padaria) throw new NotFoundException('Padaria não encontrada');
    return padaria;
  }

  async buscarPorDono(donoId: number) {
    const padaria = await this.padariaRepo.findOne({ 
      where: { dono: { id: donoId } } 
    });
    if (!padaria) throw new NotFoundException('Você ainda não possui uma padaria cadastrada.');
    return padaria;
  }

  async criar(dados: CriarPadariaDto, donoId: number) {
    const padaria = this.padariaRepo.create({
      ...dados,
      dono: { id: donoId } as any,
    });
    return await this.padariaRepo.save(padaria);
  }

  async atualizarConfiguracoes(donoId: number, dados: AtualizarConfiguracoesDto) {
    const padaria = await this.buscarPorDono(donoId);
    Object.assign(padaria, dados);
    return await this.padariaRepo.save(padaria);
  }

  async atualizarLogo(donoId: number, caminhoLogo: string) {
    const padaria = await this.buscarPorDono(donoId);
    padaria.logo_url = caminhoLogo;
    return await this.padariaRepo.save(padaria);
  }
}