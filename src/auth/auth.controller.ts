import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserSignupDto } from './dto/auth.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/shared/dto/ApiResponse.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserLoginDto, @Res() res: Response): Promise<any> {
    try {
      const { email, password } = body;
      const data = await this.authService.login(email, password);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }

  @Post('signup')
  async signup(
    @Body() body: UserSignupDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const data = await this.authService.signup(body);
      return res.json(new ApiResponse('Success', HttpStatus.OK, data));
    } catch (err) {
      return res.json(new ApiResponse(err.message, err.status, null));
    }
  }
}
