import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '../auth/dto/login.dot';
import { SessionDto } from '../auth/dto/session.dto';
import { UserInformationDto } from './dto/user-information.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  private async validatePassoword(
    user: UserEntity,
    password,
  ): Promise<boolean> {
    const generatedHash = await bcrypt.hash(password, user.salt);
    return generatedHash === user.password;
  }

  /**
   * Get User profile
   * @param session
   */
  async getUserProfile(session: SessionDto) {
    this.logger.log({ LOG_ENTER: 'getUserProfile()' });
    const user = await this.userRepository.getUser(session.userId);

    if (!user) throw new NotFoundException('User not found');

    this.logger.log({ LOG_EXIT: 'getUserProfile()' });
    return user;
  }

  /**
   * Edit user information
   * @param session
   * @param userInformationDto
   */
  async editUserInformation(
    session: SessionDto,
    userInformationDto: UserInformationDto,
  ) {
    this.logger.log({ LOG_ENTER: 'editUserInformation()' });

    const user = await this.userRepository.getUser(session.userId);
    if (!user) throw new NotFoundException('User not found');

    const userInformation = plainToClass(UserEntity, userInformationDto);
    await this.userRepository.updateUser(user.id, userInformation);

    this.logger.log({ LOG_EXIT: 'editUserInformation()' });
    return await this.userRepository.getUserById(user.id);
  }

  async validateUserByPassword(loginDto: LoginDto) {
    const user = await this.userRepository.getUserByEmailAddress(
      loginDto.emailAddress,
    );
    const isValidUser = await this.validatePassoword(user, loginDto.password);
    if (!isValidUser) {
      throw new ForbiddenException('Invalid user password');
    }
  }
}
