import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { FuncaoUsuario } from '../../usuarios/usuario.entity';

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
  nomePadaria?: string; // Campo que vem do seu HTML

  @IsEnum(FuncaoUsuario)
  @IsOptional()
  funcao?: FuncaoUsuario;
}