import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExceptionsService } from 'src/infraestructure/exceptions/exceptions.service';

type payloadJwt = {
    username: string
    id: number
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly exceptionService: ExceptionsService,
    // private readonly authService: AuthService
  ) {
    let jwtSecret = process.env.JWT_SECRET;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: payloadJwt) {
    const verified = { username: payload.username, id: payload.id };
    return verified;
  }
}