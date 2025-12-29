import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Produto } from '../produtos/produto.entity';

@Entity('padarias')
export class Padaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  endereco: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', nullable: true })
  logo_url: string;

  @Column({ type: 'varchar', nullable: true })
  telefone: string;

  @Column({ type: 'varchar', nullable: true })
  whatsapp: string;

  @Column({ type: 'varchar', nullable: true })
  instagram_url: string;

  @Column({ type: 'varchar', nullable: true })
  facebook_url: string;

  @Column({ type: 'int', nullable: true })
  raio_entrega_km: number;

  @Column({
    type: 'enum',
    enum: ['FIXA', 'POR_DISTANCIA', 'POR_BAIRRO'],
    default: 'FIXA',
  })
  taxa_entrega_tipo: 'FIXA' | 'POR_DISTANCIA' | 'POR_BAIRRO';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxa_entrega_valor: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxa_por_km: number;

  @Column({ type: 'json', nullable: true })
  taxa_bairro_config: Record<string, number> | null;

  @Column({ type: 'int', nullable: true })
  tempo_medio_minutos: number;

  @Column({ type: 'boolean', default: false })
  retirada_no_local: boolean;

  @Column({ type: 'json', nullable: true })
  horarios_semana: Array<{
    dia: string;
    abre: string;
    fecha: string;
    aberto: boolean;
  }> | null;

  @Column({ type: 'json', nullable: true })
  horarios_especiais: Array<{ data: string; aberto: boolean }> | null;

  @Column({ type: 'simple-array', nullable: true })
  formas_pagamento: Array<'CARTAO' | 'PIX' | 'DINHEIRO' | 'VALE_REFEICAO'>;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm: Date;

  @Column({ type: 'int', default: 0 })
  entregasNoMes: number;

  @Column({ type: 'varchar', default: 'BASICO' })
  plano: string;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'dono_id' })
  dono: Usuario;

  @OneToMany(() => Produto, (produto) => produto.padaria)
  produtos: Produto[];
}