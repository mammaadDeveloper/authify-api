import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenType } from 'src/common/types/token.type';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt.access.secret'),
    });
  }
  validate(payload: AccessTokenType): unknown {
    return this.userService.findById(payload.sub);
  }
}
