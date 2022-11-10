import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfigModule } from './core/config/app-config.module';
import { DatabaseModule } from './core/database/database.module';
import { GlobalExceptionFilter } from './core/exceptions/global-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule, UserModule],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    HealthService,
  ],
})
export class AppModule {}
