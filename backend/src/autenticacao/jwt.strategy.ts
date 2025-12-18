// backend/src/autenticacao/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FuncaoUsuario } from '../usuarios/usuario.entity';

// Define a estrutura que o JWT Payload terá
export interface JwtPayload {
  email: string;
  sub: number; // ID do usuário
  funcao: FuncaoUsuario;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extrai o JWT do cabeçalho 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // O método validate é chamado após a validação do token
  validate(payload: JwtPayload): any {
    return {
      userId: payload.sub,
      email: payload.email,
      funcao: payload.funcao,
    };
  }
}
