import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Usuario, FuncaoUsuario } from './usuarios/usuario.entity';
import { Padaria } from './padarias/padaria.entity';
import { Produto } from './produtos/produto.entity';
import { Pedido, StatusPedido } from './pedidos/pedido.entity';
import { DetalhePedido } from './pedidos/detalhe-pedido.entity';
import { Gasto } from './financeiro/gasto.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  // Limpar Banco (Opcional, cuidado em prod)
  console.log('--- Limpando Banco de Dados ---');
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
  await dataSource.getRepository(DetalhePedido).clear();
  await dataSource.getRepository(Pedido).clear();
  await dataSource.getRepository(Gasto).clear();
  await dataSource.getRepository(Produto).clear();
  await dataSource.getRepository(Padaria).clear();
  await dataSource.getRepository(Usuario).clear();
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

  console.log('--- Criando Cenário de Teste ---');

  // 1. Criar Dono da Padaria
  const senhaHash = await bcrypt.hash('123456', 10);
  const dono = new Usuario();
  dono.nome = 'João Padeiro';
  dono.email = 'joao@dono.com';
  dono.senha = senhaHash;
  dono.funcao = FuncaoUsuario.DONO_PADARIA;
  dono.endereco = 'Rua da Padaria, 100';
  await dataSource.getRepository(Usuario).save(dono);
  console.log('✅ Dono Criado:', dono.email);

  // 2. Criar Padaria
  const padaria = new Padaria();
  padaria.nome = 'Padaria do João';
  padaria.endereco = 'Rua da Padaria, 100';
  padaria.dono = dono;
  await dataSource.getRepository(Padaria).save(padaria);
  console.log('✅ Padaria Criada:', padaria.nome);

  // 3. Criar Produtos
  const p1 = new Produto();
  p1.nome = 'Pão Francês';
  p1.preco = 0.8;
  p1.estoque = 100;
  p1.padaria = padaria;
  await dataSource.getRepository(Produto).save(p1);

  const p2 = new Produto();
  p2.nome = 'Bolo de Cenoura';
  p2.preco = 25.0;
  p2.estoque = 10;
  p2.padaria = padaria;
  await dataSource.getRepository(Produto).save(p2);
  console.log('✅ Produtos Criados: Pão e Bolo');

  // 3.1 Criar segunda Padaria de teste com seu Dono e Produtos
  const dono2 = new Usuario();
  dono2.nome = 'Carlos Dono';
  dono2.email = 'dono@padariateste.com';
  dono2.senha = senhaHash;
  dono2.funcao = FuncaoUsuario.DONO_PADARIA;
  dono2.endereco = 'Rua Teste, 123';
  await dataSource.getRepository(Usuario).save(dono2);
  console.log('✅ Dono Criado:', dono2.email);

  const padariaTeste = new Padaria();
  padariaTeste.nome = 'Padaria Teste';
  padariaTeste.endereco = 'Rua Teste, 123';
  padariaTeste.dono = dono2;
  await dataSource.getRepository(Padaria).save(padariaTeste);
  console.log('✅ Padaria Criada:', padariaTeste.nome);

  const pt1 = new Produto();
  pt1.nome = 'Pão Francês';
  pt1.preco = 0.8;
  pt1.estoque = 200;
  pt1.categoria = 'Pães';
  pt1.padaria = padariaTeste;
  await dataSource.getRepository(Produto).save(pt1);

  const pt2 = new Produto();
  pt2.nome = 'Bolo de Cenoura';
  pt2.preco = 25.0;
  pt2.estoque = 20;
  pt2.categoria = 'Doces';
  pt2.padaria = padariaTeste;
  await dataSource.getRepository(Produto).save(pt2);

  const pt3 = new Produto();
  pt3.nome = 'Café Expresso';
  pt3.preco = 5.0;
  pt3.estoque = 200;
  pt3.categoria = 'Bebidas';
  pt3.padaria = padariaTeste;
  await dataSource.getRepository(Produto).save(pt3);
  console.log('✅ Produtos Criados na Padaria Teste: Pão, Bolo e Café');

  // 4. Criar Cliente
  const cliente = new Usuario();
  cliente.nome = 'Maria Cliente';
  cliente.email = 'maria@cliente.com';
  cliente.senha = senhaHash;
  cliente.funcao = FuncaoUsuario.CLIENTE;
  cliente.endereco = 'Rua do Cliente, 50';
  await dataSource.getRepository(Usuario).save(cliente);
  console.log('✅ Cliente Criado:', cliente.email);

  // 5. Simular Pedido
  console.log('--- Simulando Pedido ---');
  // Cliente compra 2 Bolos
  const pedido = new Pedido();
  pedido.cliente = cliente;
  pedido.padaria = padaria;
  pedido.enderecoEntrega = cliente.endereco;
  pedido.valorTotal = 50.0; // 2 * 25
  pedido.status = StatusPedido.PENDENTE;

  const detalhe = new DetalhePedido();
  detalhe.produto = p2;
  detalhe.quantidade = 2;
  detalhe.precoUnitario = 25.0;
  detalhe.pedido = pedido; // Associação

  // Salvar Pedido e Detalhes (Cascade deve cuidar do detalhe se configurado, mas faremos manual para garantir)
  await dataSource.getRepository(Pedido).save(pedido);
  detalhe.pedido = pedido; // Garante ID
  await dataSource.getRepository(DetalhePedido).save(detalhe);

  // Atualizar Estoque (Simulando Service)
  p2.estoque -= 2;
  p2.totalVendido += 2;
  await dataSource.getRepository(Produto).save(p2);
  console.log('✅ Pedido Criado. Estoque do Bolo atualizado para:', p2.estoque);

  // 6. Simular Entrega e Faturamento
  console.log('--- Simulando Entrega ---');
  pedido.status = StatusPedido.ENTREGUE;
  await dataSource.getRepository(Pedido).save(pedido);

  // Atualizar contagem da padaria
  padaria.entregasNoMes += 1;
  await dataSource.getRepository(Padaria).save(padaria);
  console.log(
    '✅ Pedido Entregue. Entregas da padaria:',
    padaria.entregasNoMes,
  );

  // 7. Simular Gasto
  const gasto = new Gasto();
  gasto.descricao = 'Saco de Farinha';
  gasto.quantidade = 1;
  gasto.valorUnitario = 100.0;
  gasto.valorTotal = 100.0;
  gasto.padaria = padaria;
  await dataSource.getRepository(Gasto).save(gasto);
  console.log('✅ Gasto Registrado: Farinha R$ 100');

  console.log('--- Teste Finalizado com Sucesso! ---');
  process.exit(0);
}

void bootstrap();
