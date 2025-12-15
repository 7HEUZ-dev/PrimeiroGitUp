// backend/src/pedidos/detalhe-pedido.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity'; // Importamos a Pedido Entity (a ser criada abaixo)
import { Produto } from '../produtos/produto.entity';

@Entity('detalhes_pedido')
export class DetalhePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoUnitario: number; // Preço do produto no momento da compra

  // N:1 - Relação com o Pedido
  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido: Pedido;

  // N:1 - Relação com o Produto
  @ManyToOne(() => Produto)
  produto: Produto;
}