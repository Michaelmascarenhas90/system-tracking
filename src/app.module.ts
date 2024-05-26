import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './DB/PrismaService';
// import { UserController } from './module/user/user.controller';
import { UserModule } from './module/user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { VehicleModule } from './module/vehicle/vehicle.module';
import { AuthGuard } from './guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    VehicleModule,
    JwtModule.register({
      global: true, // Torna o módulo global
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    PrismaService,
    AuthService,
    {
      provide: APP_GUARD, // Registra o AuthGuard como global
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
