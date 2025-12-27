import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum TaxaEntregaTipo {
  FIXA = 'FIXA',
  POR_DISTANCIA = 'POR_DISTANCIA',
  POR_BAIRRO = 'POR_BAIRRO',
}

export enum FormaPagamento {
  CARTAO = 'CARTAO',
  PIX = 'PIX',
  DINHEIRO = 'DINHEIRO',
  VALE_REFEICAO = 'VALE_REFEICAO',
}

class HorarioSemanaDto {
  @IsString()
  dia: string;
  @IsString()
  abre: string;
  @IsString()
  fecha: string;
  @IsBoolean()
  aberto: boolean;
}

class HorarioEspecialDto {
  @IsString()
  data: string; // YYYY-MM-DD
  @IsBoolean()
  aberto: boolean;
}

export class AtualizarConfiguracoesDto {
  @IsUrl({ require_tld: false })
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  whatsapp?: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  instagramUrl?: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  facebookUrl?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  raioEntregaKm?: number;

  @IsEnum(TaxaEntregaTipo)
  @IsOptional()
  taxaEntregaTipo?: TaxaEntregaTipo;

  @IsNumber()
  @Min(0)
  @IsOptional()
  taxaEntregaValor?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  taxaPorKm?: number;

  @IsOptional()
  taxaBairroConfig?: Record<string, number>;

  @IsInt()
  @Min(0)
  @IsOptional()
  tempoMedioMinutos?: number;

  @IsBoolean()
  @IsOptional()
  retiradaNoLocal?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioSemanaDto)
  @IsOptional()
  horariosSemana?: HorarioSemanaDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioEspecialDto)
  @IsOptional()
  horariosEspeciais?: HorarioEspecialDto[];

  @IsArray()
  @IsEnum(FormaPagamento, { each: true })
  @IsOptional()
  formasPagamento?: FormaPagamento[];
}
