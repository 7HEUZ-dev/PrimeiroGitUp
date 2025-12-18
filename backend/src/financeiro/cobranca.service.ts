import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Padaria } from '../padarias/padaria.entity';

@Injectable()
export class CobrancaService {
  constructor(
    @InjectRepository(Padaria)
    private padariaRepo: Repository<Padaria>,
  ) {}

  // Simula o cálculo da fatura mensal
  async calcularFatura(padariaId: number) {
    const padaria = await this.padariaRepo.findOne({
      where: { id: padariaId },
    });
    if (!padaria) throw new Error('Padaria não encontrada');

    const entregas = padaria.entregasNoMes;
    let valor = 0;
    let planoAtual = padaria.plano;

    // Regra de Negócio (Exemplo do usuário)
    // Pacote básico: até 100 entregas -> R$ 200
    // Pacote Pro: até 300 entregas -> R$ 500

    if (entregas <= 100) {
      valor = 200;
      planoAtual = 'BASICO';
    } else {
      valor = 500;
      planoAtual = 'PRO'; // Padaria maior
    }

    return {
      padaria: padaria.nome,
      entregasFeitas: entregas,
      planoSugerido: planoAtual,
      valorFatura: valor,
    };
  }
}
