import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Padaria } from './padaria.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CriarPadariaDto } from './dto/criar-padaria.dto';

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
}
