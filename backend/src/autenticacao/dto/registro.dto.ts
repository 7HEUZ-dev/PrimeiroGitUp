import { FuncaoUsuario } from '../../usuarios/usuario.entity';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegistroDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  nomePadaria?: string;

  @IsEnum(FuncaoUsuario)
  funcao: FuncaoUsuario;
}
