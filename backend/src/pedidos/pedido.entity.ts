// backend/src/pedidos/pedido.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Padaria } from '../padarias/padaria.entity';
import { DetalhePedido } from './detalhe-pedido.entity'; // Importa a entidade detalhe

export enum StatusPedido {
  PENDENTE = 'pendente', // Pedido criado, aguardando confirmação (ou pagamento)
  PREPARACAO = 'em_preparacao', // Padaria visualizou e está fazendo
  A_CAMINHO = 'a_caminho', // Entrega despachada
  ENTREGUE = 'entregue', // Entrega concluída (FINALIZAR A ENTREGA)
  CANCELADO = 'cancelado',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataPedido: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @Column({ type: 'varchar' })
  enderecoEntrega: string; 

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.PENDENTE,
  })
  status: StatusPedido; // Finalizado/Não Finalizado

  // N:1 - O cliente que fez o pedido
  @ManyToOne(() => Usuario)
  cliente: Usuario;

  // N:1 - A padaria que vai atender o pedido
  @ManyToOne(() => Padaria)
  padaria: Padaria;
  
  // 1:N - Os itens dentro do pedido (DetalhePedido)
  @OneToMany(() => DetalhePedido, (detalhe) => detalhe.pedido, { cascade: true })
  itens: DetalhePedido[];
}