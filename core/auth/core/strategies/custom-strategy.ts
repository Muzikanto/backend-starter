import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { extractAuthToken } from '@core/auth/core/utils';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from '@core/auth/core/auth.types';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(protected readonly jwtService: JwtService) {
    super();
  }

  async validate(req: FastifyRequest): Promise<IAuthUser> {
    const bearerToken = extractAuthToken(req);

    if (!bearerToken) {
      throw new UnauthorizedException('Token does not provided');
    }

    const token = bearerToken.replace('Bearer ', '');
    const info = this.jwtService.decode(token) as IAuthUser;

    return info;
  }
}
