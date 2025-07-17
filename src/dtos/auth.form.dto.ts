import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthRegisterFormDto {
  @ApiProperty({
    description: 'Username',
    example: 'client12345',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'The secret password of your account!',
    example: 'Test1234=',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Your firstname!',
    example: 'Deny',
    required: true,
  })
  @IsString()
  firstname: string;
}

export class AuthLoginFormDto {
  @ApiProperty({
    description: 'Username',
    example: 'client12345',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'The secret password of your account!',
    example: 'Test1234=',
    required: true,
  })
  @IsString()
  password: string;
}
