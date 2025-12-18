// backend/src/autenticacao/autenticacao.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { Usuario } from '../usuarios/usuario.entity';
import { Padaria } from '../padarias/padaria.entity'; // Importar Padaria
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Usuario, Padaria]), // Registrar Padaria

    // Configuração Assíncrona do JWT (Lê a chave secreta do .env)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }, // Token expira em 60 minutos
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, JwtStrategy],
  exports: [AutenticacaoService, JwtModule],
})
export class AutenticacaoModule {}
