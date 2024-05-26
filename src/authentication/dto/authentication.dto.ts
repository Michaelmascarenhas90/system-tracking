import { IsEmail, IsJWT, IsString } from 'class-validator';

export class AuthenticationLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AuthenticationForgetDto {
  @IsEmail()
  email: string;
}

export class AuthenticationResetDto {
  @IsJWT()
  token: string;

  @IsString()
  password: string;
}
