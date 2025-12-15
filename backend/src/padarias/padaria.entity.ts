// backend/src/padarias/padaria.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity'; 
import { Produto } from '../produtos/produto.entity'; 

@Entity('padarias')
export class Padaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar' })
  endereco: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;
  
  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm: Date;

  // 1:1 - O Dono
  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'dono_id' }) // Coluna para armazenar o ID do dono
  dono: Usuario;
  
  // 1:N - Os Produtos
  @OneToMany(() => Produto, (produto) => produto.padaria)
  produtos: Produto[];
}