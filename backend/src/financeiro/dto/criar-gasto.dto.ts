import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CriarGastoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsInt()
  @IsPositive()
  quantidade: number;

  @IsNumber()
  @IsPositive()
  valorUnitario: number;
}
