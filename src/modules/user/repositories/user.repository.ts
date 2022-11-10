import { Injectable, Logger } from '@nestjs/common';
import { UpdateResult, Not, IsNull, DataSource, Repository } from 'typeorm';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  private readonly userRepository: Repository<UserEntity>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  /**
   * Get All the users
   * @returns
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: {
        uuid: Not(IsNull()),
      },
      order: {
        id: 'ASC',
      },
      select: ['uuid', 'name', 'email', 'id'],
    });
  }

  /**
   * Get user by id
   * @param userId
   * @returns
   */
  async getUserById(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  /**
   * Get user by email Address
   * @param emailAddress
   * @returns
   */
  async getUserByEmailAddress(emailAddress: string): Promise<UserEntity> {
    if (!emailAddress) return;
    return await this.userRepository.findOne({
      where: { email: emailAddress },
    });
  }

  /**
   * Crate a new user
   * @param userInformation
   * @returns
   */
  async createUser(userInformation: RegisterUserDto): Promise<UserEntity> {
    this.logger.log({ LOG_ENTER: 'createUser()' });

    const { hashedPassword, salt } = await this.generateHashedPassword(
      userInformation.password,
    );

    const user = new UserEntity();
    user.name = userInformation.name;
    user.email = userInformation.emailAddress;
    user.password = hashedPassword;
    user.salt = salt;
    user.active = true;
    const savedUser = await this.userRepository.save(user);

    this.logger.log({ LOG_EXIT: 'createUser()' });
    return savedUser;
  }

  /**
   * Get the user details
   * @param user
   * @returns
   */
  async getUser(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  /**
   * Update user
   * @param userId
   * @param updatedUser
   * @returns
   */
  async updateUser(
    userId: number,
    userEntity: Partial<UserEntity>,
  ): Promise<UpdateResult> {
    this.logger.log({ LOG_ENTER: 'updateUser()' });

    const updatedUser = await this.userRepository.update(
      { id: userId },
      userEntity,
    );

    this.logger.log({ LOG_EXIT: 'updateUser()' });
    return updatedUser;
  }

  /**
   * Save user
   * @param newUser
   * @returns
   */
  async saveUser(newUser: UserEntity): Promise<UserEntity> {
    this.logger.log({ LOG_ENTER: 'saveUser()' });
    const savedUser = await this.userRepository.save(newUser);
    this.logger.log({ LOG_EXIT: 'saveUser()' });
    return savedUser;
  }

  /**
   * Soft delete user
   * @param user
   */
  async deleteUser(user: UserEntity) {
    this.logger.log({ LOG_ENTER: 'deleteUser()' });
    await UserEntity.softRemove(user);
    this.logger.log({ LOG_EXIT: 'deleteUser()' });
  }

  private async generateHashedPassword(password: string) {
    this.logger.log({ LOG_ENTER: 'generateHashedPassword()' });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    this.logger.log({ LOG_EXIT: 'generateHashedPassword()' });
    return { hashedPassword, salt };
  }
}
