import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/DB/PrismaService';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthenticationService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  async createToken(user: User) {
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '24 hours',
        subject: user.id,
        issuer: this.issuer,
        audience: this.audience,
      },
    );
    return { accessToken: token };
  }

  checkToken(token: string) {
    try {
      const check = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return check;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email e ou senha estão incorretos, verifique as informações e tente novamente',
      );
    }

    const passwordMath = await this.authService.comparePasswords(
      password,
      user.password,
    );

    if (!passwordMath) {
      throw new UnauthorizedException(
        'Email e ou senha estão incorretos, verifique as informações e tente novamente',
      );
    }

    return this.createToken(user);
  }

  // implementar esqueci minha senha com solicitação de email e cadastro de nova senha após recebimento do email
  // email pode ser enviado usando lib nodemailer que é compativel com o ecosistema node
}
