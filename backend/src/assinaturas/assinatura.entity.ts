import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Padaria } from '../padarias/padaria.entity';
import { Plano } from './plano.entity';

export enum StatusAssinatura {
  ATIVA = 'ATIVA',
  SUSPENSA = 'SUSPENSA',
}

@Entity('assinaturas')
export class Assinatura {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Padaria)
  padaria: Padaria;

  @ManyToOne(() => Plano)
  plano: Plano;

  @Column({
    type: 'enum',
    enum: StatusAssinatura,
    default: StatusAssinatura.ATIVA,
  })
  status: StatusAssinatura;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date' })
  data_vencimento: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
