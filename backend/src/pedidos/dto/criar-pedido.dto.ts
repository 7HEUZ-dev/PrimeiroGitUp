import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class ItemPedidoDto {
  @IsInt()
  @IsPositive()
  produtoId: number;

  @IsInt()
  @IsPositive()
  quantidade: number;
}

export class CriarPedidoDto {
  @IsInt()
  @IsPositive()
  clienteId: number;

  @IsInt()
  @IsPositive()
  padariaId: number;

  @IsString()
  @IsNotEmpty()
  enderecoEntrega: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];
}
