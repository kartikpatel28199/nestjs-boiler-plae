import {
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  private readonly logger = new Logger(JwtAuthGuard.name);

  public handleRequest(err: unknown, user): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new HttpException('Invalid access token', 401);
    }

    return user;
  }
}
