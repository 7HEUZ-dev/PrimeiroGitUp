import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { AssinaturasService } from './assinaturas.service';
import { StatusAssinatura } from './assinatura.entity';
import { Request } from 'express';

@Injectable()
export class AssinaturaAtivaGuard implements CanActivate {
  constructor(private readonly assinaturasService: AssinaturasService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: { padariaId?: number } }>();

    const bodyPadariaId = (req.body as { padariaId?: number } | undefined)
      ?.padariaId;
    const tokenPadariaId = req.user?.padariaId;
    const alvoPadariaId = bodyPadariaId ?? tokenPadariaId;
    if (!alvoPadariaId) return true;

    console.log('Padaria ID do Token:', tokenPadariaId);
    console.log('Padaria ID do Corpo:', bodyPadariaId);
    console.log('Padaria ID Alvo:', alvoPadariaId);

    const assinatura =
      await this.assinaturasService.verificarVencimento(alvoPadariaId);
    if (!assinatura || assinatura.status !== StatusAssinatura.ATIVA) {
      throw new ForbiddenException(
        'Assinatura vencida. Regularize para continuar.',
      );
    }
    return true;
  }
}
