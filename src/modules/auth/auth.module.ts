import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../core/config/app-config.module';
import { AppConfigService } from '../../core/config/app-config.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../core/strategy/jwt.strategy';
import { UtilsModule } from '../../core/services/utils-service.module';
import { UserRepository } from '../user/repositories/user.repository';
import { GoogleStrategy } from '../../core/strategy/google.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecretKey,
        signOptions: {
          expiresIn: appConfigService.jwtExpiresIn,
        },
      }),
      inject: [AppConfigService],
    }),
    AppConfigModule,
    UtilsModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    AuthService,
    UserRepository,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
