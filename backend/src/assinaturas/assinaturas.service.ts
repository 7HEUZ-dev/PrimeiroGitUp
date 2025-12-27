import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assinatura, StatusAssinatura } from './assinatura.entity';
import { Plano } from './plano.entity';
import { Padaria } from '../padarias/padaria.entity';

@Injectable()
export class AssinaturasService {
  constructor(
    @InjectRepository(Assinatura)
    private assinaturaRepo: Repository<Assinatura>,
    @InjectRepository(Plano)
    private planoRepo: Repository<Plano>,
  ) {}

  async obterPorPadaria(padariaId: number) {
    return this.assinaturaRepo.findOne({
      where: { padaria: { id: padariaId } },
      relations: ['plano', 'padaria'],
    });
  }

  async verificarVencimento(padariaId: number) {
    const assinatura = await this.obterPorPadaria(padariaId);
    if (!assinatura) return null;
    const hoje = new Date();
    const venc = new Date(assinatura.data_vencimento);
    if (hoje > venc && assinatura.status !== StatusAssinatura.SUSPENSA) {
      assinatura.status = StatusAssinatura.SUSPENSA;
      await this.assinaturaRepo.save(assinatura);
    }
    return assinatura;
  }

  async suspender(padariaId: number) {
    const assinatura = await this.obterPorPadaria(padariaId);
    if (!assinatura) throw new BadRequestException('Assinatura não encontrada');
    assinatura.status = StatusAssinatura.SUSPENSA;
    return this.assinaturaRepo.save(assinatura);
  }

  async ativar(padariaId: number) {
    const assinatura = await this.obterPorPadaria(padariaId);
    if (!assinatura) throw new BadRequestException('Assinatura não encontrada');
    assinatura.status = StatusAssinatura.ATIVA;
    return this.assinaturaRepo.save(assinatura);
  }

  async renovar(padariaId: number) {
    const assinatura = await this.obterPorPadaria(padariaId);
    if (!assinatura) throw new BadRequestException('Assinatura não encontrada');
    const base = new Date();
    base.setDate(base.getDate() + 30);
    assinatura.data_vencimento = base;
    assinatura.status = StatusAssinatura.ATIVA;
    return this.assinaturaRepo.save(assinatura);
  }

  async listarPlanos() {
    return this.planoRepo.find({ where: { ativo: true } });
  }

  async obterPlanoBasicoOuCriar() {
    let plano = await this.planoRepo.findOne({ where: { nome: 'Básico' } });
    if (!plano) {
      plano = this.planoRepo.create({
        nome: 'Básico',
        valorMensal: 99.9,
        limitePedidos: 1000,
        ativo: true,
      });
      plano = await this.planoRepo.save(plano);
    }
    return plano;
  }

  async criarAssinaturaInicial(padariaId: number) {
    const existe = await this.obterPorPadaria(padariaId);
    if (existe) return existe;
    const plano = await this.obterPlanoBasicoOuCriar();
    const inicio = new Date();
    const venc = new Date();
    venc.setDate(venc.getDate() + 30);
    const assinatura = this.assinaturaRepo.create({
      padaria: { id: padariaId } as Padaria,
      plano,
      status: StatusAssinatura.ATIVA,
      data_inicio: inicio,
      data_vencimento: venc,
    });
    return this.assinaturaRepo.save(assinatura);
  }
}
