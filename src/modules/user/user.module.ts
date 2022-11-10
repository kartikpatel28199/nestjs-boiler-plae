import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AppConfigModule } from '../../core/config/app-config.module';
import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from '../../core/services/utils-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AppConfigModule,
    AuthModule,
    UtilsModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
