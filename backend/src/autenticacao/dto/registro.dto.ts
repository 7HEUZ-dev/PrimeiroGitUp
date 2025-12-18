import { FuncaoUsuario } from '../../usuarios/usuario.entity';

export class RegistroDto {
  nome: string;
  email: string;
  senha: string;
  endereco?: string;
  nomePadaria?: string; // Opcional, apenas para Dono
  funcao: FuncaoUsuario;
}
