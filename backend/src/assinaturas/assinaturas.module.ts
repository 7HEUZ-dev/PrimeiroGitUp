import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturasService } from './assinaturas.service';
import { AssinaturasController } from './assinaturas.controller';
import { Assinatura } from './assinatura.entity';
import { Plano } from './plano.entity';
import { AssinaturaAtivaGuard } from './assinatura-ativa.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Assinatura, Plano])],
  providers: [AssinaturasService, AssinaturaAtivaGuard],
  controllers: [AssinaturasController],
  exports: [AssinaturasService, AssinaturaAtivaGuard],
})
export class AssinaturasModule {}
