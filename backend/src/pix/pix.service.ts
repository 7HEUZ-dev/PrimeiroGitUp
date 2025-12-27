import { Injectable } from '@nestjs/common';
import { toDataURL } from 'qrcode';

@Injectable()
export class PixService {
  async gerarQrCode(chavePix: string, valor: number): Promise<string> {
    const texto = `PIX: ${chavePix} | VALOR: ${valor}`;
    const toDataURLTyped = toDataURL as unknown as (
      data: string,
    ) => Promise<string>;
    const dataUrl = await toDataURLTyped(texto);
    return dataUrl;
  }
}
