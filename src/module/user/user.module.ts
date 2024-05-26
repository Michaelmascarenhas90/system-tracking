import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/DB/PrismaService';
import { AuthService } from 'src/auth/auth.service';
import { UserCheckIdMiddleware } from 'src/middlewares/use-check-id-middleware';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthenticationModule } from 'src/authentication/authentication.module';
@Module({
  imports: [AuthenticationModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, AuthGuard],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserCheckIdMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
