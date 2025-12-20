// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createConnection } from 'mysql2/promise';

// --- IMPORTS DE ENTIDADES E MÓDULOS (PORTUGUÊS) ---
import { Usuario } from './usuarios/usuario.entity';
import { Padaria } from './padarias/padaria.entity';
import { Produto } from './produtos/produto.entity';
import { Pedido } from './pedidos/pedido.entity'; // Entidade Pedido
import { DetalhePedido } from './pedidos/detalhe-pedido.entity'; // Entidade DetalhePedido
import { Gasto } from './financeiro/gasto.entity'; // Entidade Gasto

import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PadariasModule } from './padarias/padarias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
// --------------------------------------------------

@Module({
  imports: [
    // Configura o carregamento do arquivo banco.env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'banco.env', // Seu arquivo de credenciais
    }),

    // Configuração da Conexão TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST') ?? '127.0.0.1';
        const portStr = configService.get<string>('DB_PORT') ?? '3306';
        const port = Number.parseInt(portStr, 10);
        const username = configService.get<string>('DB_USERNAME') ?? 'root';
        const password = configService.get<string>('DB_PASSWORD') ?? '';
        const database = configService.get<string>('DB_DATABASE') ?? 'padaria';

        try {
          const conn = await createConnection({
            host,
            port,
            user: username,
            password,
          });
          await conn.query('CREATE DATABASE IF NOT EXISTS ??', [database]);
          await conn.end();
        } catch {}

        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [Usuario, Padaria, Produto, Pedido, DetalhePedido, Gasto],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    // --- MÓDULOS DA APLICAÇÃO ---
    AutenticacaoModule,
    UsuariosModule,
    PadariasModule,
    ProdutosModule,
    PedidosModule,
    FinanceiroModule,
    // ----------------------------
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
