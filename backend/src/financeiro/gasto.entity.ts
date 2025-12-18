import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Padaria } from '../padarias/padaria.entity';

@Entity('gastos')
export class Gasto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  descricao: string; // Ex: Caixa de Leite

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number; // quantidade * valorUnitario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCompra: Date;

  @ManyToOne(() => Padaria, { onDelete: 'CASCADE' })
  padaria: Padaria;
}
