import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsInt()
  @IsPositive()
  estoque: number;

  @IsBoolean()
  disponivel: boolean;
}
