import {
  Controller,
  UseInterceptors,
  Logger,
  Body,
  Post,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

import { GoogleOauthGuard } from '../../core/guards/google-auth.guard';
import { LoginDto } from './dto/login.dot';

@Controller({
  path: 'public/auth',
  version: ['1'],
})
@ApiTags('Authentication')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  /**
   * User signup
   * @param registerUserDto
   */

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiOkResponse({
    description: 'User registered successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Technical error while processing',
  })
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    this.logger.log({ LOG_ENTER: 'registerUser()' });
    const data = await this.authService.registerUser(registerUserDto);
    this.logger.log({ LOG_EXIT: 'registerUser()' });
    return { message: 'User registered', data };
  }

  /**
   * login
   * @param loginDto
   * @returns
   */
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'User loggedin successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Technical error while processing',
  })
  async login(@Body() loginDto: LoginDto) {
    this.logger.log({ LOG_ENTER: 'registerUser()' });
    const data = await this.authService.login(loginDto);
    this.logger.log({ LOG_EXIT: 'registerUser()' });
    return { message: 'User loggedin successfully', data };
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    const data = await this.authService.googleLogin(req);
    return { data };
  }
}
