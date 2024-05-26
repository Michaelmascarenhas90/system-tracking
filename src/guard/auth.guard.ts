import { AuthenticationService } from './../authentication/authentication.service';
// auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest(); // Obter a requisição
    const authorization = request.headers.authorization; // Acessar o header diretamente

    return this.authenticationService.isValidToken(
      (authorization ?? '').split(' ')[1],
    );
  }
}
