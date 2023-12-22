import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const tokenInfo = this.extractTokenFromHeader(request);

    if (!tokenInfo) throw new UnauthorizedException();
    const { token, type } = tokenInfo;

    if (type === 'jwt') {
      try {
        const payload = await this.jwtService.verifyAsync(token);
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
    } else {
      // in real project the key should be hashed and stored in database
      if (token !== this.configService.get('API_KEY'))
        throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request):
    | {
        type: 'jwt' | 'key';
        token: string;
      }
    | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const jwtToken = type === 'Bearer' ? token : undefined;
    if (jwtToken) return { type: 'jwt', token };
    const key = request.headers['api-key'];
    if (key && typeof key === 'string') return { type: 'key', token: key };
    return;
  }
}
