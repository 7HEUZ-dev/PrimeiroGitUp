// backend/src/usuarios/usuarios.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity'; // Importa a Entidade Usuario

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Torna o repositório Usuario disponível
  controllers: [],
  providers: [],
  exports: [TypeOrmModule], // EXPORTA o repositório para que o AutenticacaoModule o utilize
})
export class UsuariosModule {}
