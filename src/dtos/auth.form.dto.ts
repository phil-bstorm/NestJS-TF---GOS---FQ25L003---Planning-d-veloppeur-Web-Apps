import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthRegisterFormDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstname: string;
}

export class AuthLoginFormDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @IsString()
  password: string;
}
