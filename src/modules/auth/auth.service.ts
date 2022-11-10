import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerificationStatusType } from './type/verification.type';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginDto } from './dto/login.dot';
import { UserService } from '../user/user.service';
import { AuthorizedUserType } from './type/authorise-user.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  /**
   * Generate access token of user
   * @param user
   * @returns
   */
  async generateAccessToken(user) {
    this.logger.log({ LOG_ENTER: 'generateAccessToken()' });
    const payload: any = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    this.logger.log({ LOG_EXIT: 'generateAccessToken()' });
    return accessToken;
  }

  /**
   * Register user
   * @param registerUserDto
   */
  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<AuthorizedUserType> {
    this.logger.log({ LOG_ENTER: 'registerUser()' });

    await this.checkUserAlreadyExist(registerUserDto.emailAddress);

    const newUser = await this.userRepository.createUser(registerUserDto);
    const user = await this.userRepository.getUserByEmailAddress(newUser.email);

    const accessToken = await this.generateAccessToken(user);

    this.logger.log({ LOG_EXIT: 'registerUser()' });
    return {
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken: accessToken,
    };
  }

  /**
   * Check user already exists
   * @param emailAddress
   */
  async checkUserAlreadyExist(emailAddress: string) {
    // Check if the user with same email exists
    const userByEmail = await this.userRepository.getUserByEmailAddress(
      emailAddress,
    );
    if (userByEmail) {
      throw new ConflictException(
        'An account with similar email address already exists.',
      );
    }
  }

  /**
   * Check email already exists and email format
   * @param emailAddress
   * @param verifyEmailDto
   */
  async checkEmailAlreadyExists(emailAddress: string) {
    this.logger.log({ LOG_ENTER: 'checkEmailAlreadyExists()' });

    const response: VerificationStatusType = {
      isExist: false,
      isNotBusinessEmail: false,
      message: `Email doesn't exist`,
    };

    // Check if the user with same email exists
    const userByEmail = await this.userRepository.getUserByEmailAddress(
      emailAddress,
    );

    if (userByEmail) {
      response.isExist = true;
      response.message = 'Email already exist';
    }

    this.logger.log({ LOG_EXIT: 'checkEmailAlreadyExists()' });
    return response;
  }

  /**
   * Google login
   * @param req
   * @returns
   */
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const accessToken = await this.generateAccessToken(req.user);
    return {
      accessToken: accessToken,
    };
  }

  /**
   * User login
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDto): Promise<AuthorizedUserType> {
    const user = await this.userRepository.getUserByEmailAddress(
      loginDto.emailAddress,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userService.validateUserByPassword(loginDto);

    const accessToken = await this.generateAccessToken(user);

    return {
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken: accessToken,
    };
  }
}
