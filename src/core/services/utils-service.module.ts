import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AppConfigModule, HttpModule],
  providers: [],
  exports: [],
})
export class UtilsModule {}
