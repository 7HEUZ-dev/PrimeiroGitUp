// backend/src/produtos/produto.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Padaria } from '../padarias/padaria.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'int', default: 0 })
  estoque: number; // Estoque

  @Column({ type: 'int', default: 0 })
  totalVendido: number; // Para o cálculo de lucro

  @Column({ type: 'boolean', default: true })
  disponivel: boolean;

  // N:1 - Pertence a uma Padaria
  @ManyToOne(() => Padaria, (padaria) => padaria.produtos)
  padaria: Padaria;
}
