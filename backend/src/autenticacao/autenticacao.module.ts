// backend/src/autenticacao/autenticacao.module.ts

import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule, 
    UsuariosModule,

    // Configuração Assíncrona do JWT (Lê a chave secreta do .env)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Lê a chave do banco.env ou usa uma chave padrão de fallback
        secret: configService.get<string>('JWT_SECRET') || 'chave_de_fallback_insegura', 
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