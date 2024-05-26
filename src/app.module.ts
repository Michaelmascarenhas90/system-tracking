import { Module } from '@nestjs/common';
import { PrismaService } from './DB/PrismaService';
// import { UserController } from './module/user/user.controller';
import { UserModule } from './module/user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UserModule, AuthenticationModule],
  providers: [PrismaService, AuthService],
})
export class AppModule {}
