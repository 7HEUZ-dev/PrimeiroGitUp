import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Usuario } from './usuarios/usuario.entity';
import { Padaria } from './padarias/padaria.entity';
import { Produto } from './produtos/produto.entity';
import { Pedido } from './pedidos/pedido.entity';
import { DetalhePedido } from './pedidos/detalhe-pedido.entity';
import { Gasto } from './financeiro/gasto.entity';
import { Assinatura } from './assinaturas/assinatura.entity';
import { Plano } from './assinaturas/plano.entity';

import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PadariasModule } from './padarias/padarias.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'banco.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') ?? '127.0.0.1',
        port: Number(configService.get<number>('DB_PORT') ?? 3306),
        username: configService.get<string>('DB_USERNAME') ?? 'root',
        password: configService.get<string>('DB_PASSWORD') ?? '',
        database: configService.get<string>('DB_DATABASE') ?? 'saas_padaria',
        entities: [Usuario, Padaria, Produto, Pedido, DetalhePedido, Gasto, Assinatura, Plano],
        synchronize: true, // Cria colunas e tabelas automaticamente no MySQL
      }),
      inject: [ConfigService],
    }),

    AutenticacaoModule,
    UsuariosModule,
    PadariasModule,
    ProdutosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}