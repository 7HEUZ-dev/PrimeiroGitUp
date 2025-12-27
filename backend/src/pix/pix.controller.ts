import { Controller, Post, Body } from '@nestjs/common';
import { PixService } from './pix.service';

@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post('qrcode')
  async gerarQrCode(
    @Body() dados: { chavePix: string; valor: number },
  ): Promise<{ qrCodeBase64: string; chavePix: string; valor: number }> {
    const qrCodeBase64 = await this.pixService.gerarQrCode(
      dados.chavePix,
      dados.valor,
    );
    return { qrCodeBase64, chavePix: dados.chavePix, valor: dados.valor };
  }
}
