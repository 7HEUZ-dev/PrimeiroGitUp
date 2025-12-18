import { IsNotEmpty, IsString } from 'class-validator';

export class CriarPadariaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;
}
