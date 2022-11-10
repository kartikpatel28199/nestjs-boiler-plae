import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('nodeEnv');
  }

  get port(): number {
    return this.configService.get<number>('port');
  }

  get databaseType(): string {
    return this.configService.get<string>('database.type');
  }

  get databaseHost(): string {
    return this.configService.get<string>('database.host');
  }

  get databasePort(): number {
    return this.configService.get<number>('database.port');
  }

  get databaseUsername(): string {
    return this.configService.get<string>('database.username');
  }

  get databasePassword(): string {
    return this.configService.get<string>('database.password');
  }

  get databaseName(): string {
    return this.configService.get<string>('database.schema');
  }

  get jwtSecretKey(): string {
    return this.configService.get<string>('jwt.secretKey');
  }

  get jwtExpiresIn(): number {
    return this.configService.get<number>('jwt.expiresIn');
  }

  get googleClientId() {
    return this.configService.get<string>('google.clientId');
  }

  get googleClientSecret() {
    return this.configService.get<string>('google.clientId');
  }

  get googleCallbackUrl() {
    return this.configService.get<string>('google.clientId');
  }
}
