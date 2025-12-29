import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum FuncaoUsuario {
  CLIENTE = 'CLIENTE',
  DONO_PADARIA = 'DONO_PADARIA',
  ADMIN = 'ADMIN',
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