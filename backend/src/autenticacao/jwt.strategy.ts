// backend/src/autenticacao/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Define a estrutura que o JWT Payload terá
export interface JwtPayload {
  email: string;
  sub: number; // ID do usuário
  funcao: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extrai o JWT do cabeçalho 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Lê a chave secreta que definimos no banco.env
      secretOrKey: configService.get<string>('JWT_SECRET') || 'chave_de_fallback_insegura',
    });
  }

  // O método validate é chamado após a validação do token
  async validate(payload: JwtPayload): Promise<any> {
    // Retorna o payload para que ele seja anexado ao objeto Request (req.user)
    return { 
      userId: payload.sub, 
      email: payload.email, 
      funcao: payload.funcao 
    };
  }
}