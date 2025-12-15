// backend/src/usuarios/usuario.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum FuncaoUsuario {
  CLIENTE = 'cliente',        
  DONO_PADARIA = 'dono_padaria', 
  ADMIN = 'admin',          
}

@Entity('usuarios') 
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false }) 
  senha: string;

  @Column({ type: 'varchar' })
  nome: string;
  
  @Column({
    type: 'enum',
    enum: FuncaoUsuario,
    default: FuncaoUsuario.CLIENTE,
  })
  funcao: FuncaoUsuario;

  @Column({ type: 'varchar', nullable: true })
  endereco: string; 
}