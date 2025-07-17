import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from 'src/dtos/auth.dto';
import { AuthLoginFormDto, AuthRegisterFormDto } from 'src/dtos/auth.form.dto';
import { authRegisterFormDtoToUserEntity } from 'src/mappers/user.mappers';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 400, description: 'Username already used' })
  async register(@Body() body: AuthRegisterFormDto) {
    const newUser = authRegisterFormDtoToUserEntity(body);
    await this.userService.create(newUser);

    return;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: LoginResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid login' })
  async login(@Body() body: AuthLoginFormDto) {
    const user = await this.userService.login(body.username, body.password);

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { token };
  }
}
