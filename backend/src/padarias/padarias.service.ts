import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Padaria } from './padaria.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CriarPadariaDto } from './dto/criar-padaria.dto';
import { AtualizarConfiguracoesDto } from './dto/atualizar-configuracoes.dto';

@Injectable()
export class PadariasService {
  constructor(
    @InjectRepository(Padaria)
    private padariaRepo: Repository<Padaria>,
  ) {}

  async criar(dados: CriarPadariaDto, donoId: number): Promise<Padaria> {
    const padaria = this.padariaRepo.create({
      ...dados,
      dono: { id: donoId } as Usuario,
    });
    return this.padariaRepo.save(padaria);
  }

  async listarTodas() {
    return this.padariaRepo.find();
  }

  async buscarPorId(id: number) {
    return this.padariaRepo.findOne({ where: { id }, relations: ['produtos'] });
  }

  async buscarPorDono(donoId: number) {
    return this.padariaRepo.findOne({
      where: { dono: { id: donoId } },
      relations: ['produtos'],
    });
  }

  async atualizarConfiguracoes(
    donoId: number,
    dados: AtualizarConfiguracoesDto,
  ): Promise<Padaria> {
    const padaria = await this.padariaRepo.findOne({
      where: { dono: { id: donoId } },
    });
    if (!padaria) throw new NotFoundException('Padaria não encontrada');

    if (dados.logoUrl !== undefined) padaria.logo_url = dados.logoUrl;
    if (dados.telefone !== undefined) padaria.telefone = dados.telefone;
    if (dados.whatsapp !== undefined) padaria.whatsapp = dados.whatsapp;
    if (dados.instagramUrl !== undefined)
      padaria.instagram_url = dados.instagramUrl;
    if (dados.facebookUrl !== undefined)
      padaria.facebook_url = dados.facebookUrl;
    if (dados.raioEntregaKm !== undefined)
      padaria.raio_entrega_km = dados.raioEntregaKm;
    if (dados.taxaEntregaTipo !== undefined)
      padaria.taxa_entrega_tipo = dados.taxaEntregaTipo;
    if (dados.taxaEntregaValor !== undefined)
      padaria.taxa_entrega_valor = dados.taxaEntregaValor;
    if (dados.taxaPorKm !== undefined) padaria.taxa_por_km = dados.taxaPorKm;
    if (dados.taxaBairroConfig !== undefined)
      padaria.taxa_bairro_config = dados.taxaBairroConfig ?? null;
    if (dados.tempoMedioMinutos !== undefined)
      padaria.tempo_medio_minutos = dados.tempoMedioMinutos;
    if (dados.retiradaNoLocal !== undefined)
      padaria.retirada_no_local = dados.retiradaNoLocal;
    if (dados.horariosSemana !== undefined)
      padaria.horarios_semana = dados.horariosSemana ?? null;
    if (dados.horariosEspeciais !== undefined)
      padaria.horarios_especiais = dados.horariosEspeciais ?? null;
    if (dados.formasPagamento !== undefined)
      padaria.formas_pagamento = dados.formasPagamento ?? [];

    return this.padariaRepo.save(padaria);
  }

  async atualizarLogo(donoId: number, logoPath: string): Promise<Padaria> {
    const padaria = await this.padariaRepo.findOne({
      where: { dono: { id: donoId } },
    });
    if (!padaria) throw new NotFoundException('Padaria não encontrada');
    padaria.logo_url = logoPath;
    return this.padariaRepo.save(padaria);
  }
}
