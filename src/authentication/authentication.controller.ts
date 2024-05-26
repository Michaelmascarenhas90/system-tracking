import { AuthenticationService } from './authentication.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthenticationLoginDto,
  AuthenticationForgetDto,
  AuthenticationResetDto,
} from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  async login(@Body() body: AuthenticationLoginDto) {
    return this.authenticationService.login(body.email, body.password);
  }

  @Post('forget')
  async forget(@Body() body: AuthenticationForgetDto) {
    return this.authenticationService.forget(body.email);
  }

  @Post('reset')
  async reset(@Body() body: AuthenticationResetDto) {
    return this.authenticationService.reset(body.password, body.token);
  }
}
