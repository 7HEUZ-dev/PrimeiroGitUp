// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

// --- IMPORTS DE ENTIDADES E MÓDULOS (PORTUGUÊS) ---
import { Usuario } from './usuarios/usuario.entity'; 
import { Padaria } from './padarias/padaria.entity'; 
import { Produto } from './produtos/produto.entity'; 
import { Pedido } from './pedidos/pedido.entity'; // Entidade Pedido
import { DetalhePedido } from './pedidos/detalhe-pedido.entity'; // Entidade DetalhePedido

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
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', 
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        // LISTA ATUALIZADA: Incluindo Pedido e DetalhePedido
        entities: [Usuario, Padaria, Produto, Pedido, DetalhePedido], 
        synchronize: true, // Cria e atualiza as tabelas automaticamente
      }),
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