import { UsersService } from '@api/users';
import { ICredentials, IUser, JwtPayload } from '@common/interfaces';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as random from 'randomstring';
import { Repository } from 'typeorm';
import { SignInDto } from './dto';
import { RefreshToken } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly usersService: UsersService
  ) {}

  async signIn(dto: SignInDto): Promise<ICredentials> {
    const user = await this.usersService.getByLogin(dto.login);

    if (!user?.password || !bcrypt.compareSync(dto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const credentials = await this.signTokens(user);

    return credentials;
  }

  async refreshCredentials(token: string): Promise<ICredentials> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
      token
    });
    if (!refreshTokenEntity) throw new BadRequestException('Invalid token');

    const credentials = await this.signTokens({
      id: refreshTokenEntity.userId
    });

    await this.refreshTokenRepository.remove([refreshTokenEntity]);

    return credentials;
  }

  private async signTokens(
    user: Required<Pick<IUser, 'id'>>
  ): Promise<ICredentials> {
    const accessToken = this.signAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return {
      accessToken,
      refreshToken: refreshToken.token
    };
  }

  private signAccessToken(user: Required<Pick<IUser, 'id'>>): string {
    const payload: JwtPayload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  private async createRefreshToken(
    user: Required<Pick<IUser, 'id'>>
  ): Promise<RefreshToken> {
    const token = random.generate({ length: 16 });
    return this.refreshTokenRepository.save(
      this.refreshTokenRepository.create({ token, userId: user.id })
    );
  }
}
