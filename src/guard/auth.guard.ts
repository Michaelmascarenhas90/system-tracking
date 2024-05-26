import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const issuer = 'login';
    const audience = 'users';
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(
        'Email e ou senha estão incorretos, verifique as informações e tente novamente',
      );
    }
    try {
      const check = this.jwtService.verify(token, {
        audience: audience,
        issuer: issuer,
      });

      request['user'] = check;

      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
