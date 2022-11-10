import {
  Controller,
  Logger,
  UseGuards,
  Req,
  Patch,
  Body,
  Get,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { UserInformationDto } from './dto/user-information.dto';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('User')
@ApiUnauthorizedResponse({
  description: 'Invalid or expire token',
})
@ApiInternalServerErrorResponse({
  description: 'Technical error while processing',
})
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  /**
   * Edit user information
   * @param req
   * @param userInformationDto
   * @returns
   */
  @ApiOperation({ summary: 'Edit user information' })
  @ApiOkResponse({
    description: 'User information updated successfully',
  })
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async editUserInformation(
    @Req() req,
    @Body() userInformationDto: UserInformationDto,
  ) {
    this.logger.log({ LOG_ENTER: 'editUserInformation()' });
    const updateProfile = await this.userService.editUserInformation(
      req.user,
      userInformationDto,
    );
    this.logger.log({ LOG_EXIT: 'editUserInformation()' });
    return {
      message: 'User information updated successfully',
      data: updateProfile,
    };
  }

  /**
   * Get User Profile
   * @param req
   * @returns
   */
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({
    description: 'User profile fetched successfully',
  })
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Req() req) {
    this.logger.log({ LOG_ENTER: 'getUserProfile()' });
    const getProfile = await this.userService.getUserProfile(req.user);
    this.logger.log({ LOG_EXIT: 'getUserProfile()' });
    return { message: 'User profile fetched successfully', data: getProfile };
  }
}
