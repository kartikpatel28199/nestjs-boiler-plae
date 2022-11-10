import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/app-config.module';
import { AppConfigService } from '../config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (
        appConfigService: AppConfigService,
      ): TypeOrmModuleOptions => ({
        username: appConfigService.databaseUsername,
        password: appConfigService.databasePassword,
        database: appConfigService.databaseName,
        host: appConfigService.databaseHost,
        port: appConfigService.databasePort,
        type: appConfigService.databaseType as any,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        multipleStatements: true,
        autoLoadEntities: true,
        logging: appConfigService.nodeEnv === 'production' ? false : true,
      }),
      inject: [AppConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
