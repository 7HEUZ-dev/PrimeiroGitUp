import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FuncaoUsuario } from '../usuarios/usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('Payload JWT:', payload);
    // O retorno deste objeto é o que o NestJS coloca dentro de 'req.user'
    return {
      id: payload.sub,
      email: payload.email,
      funcao: payload.funcao,
      padariaId: payload.padariaId,
    };
  }
}