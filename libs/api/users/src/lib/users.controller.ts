import { AuthGuard } from '@api/common';
import { JwtPayload } from '@common/interfaces';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req: Request) {
    const { sub } = (req as unknown as { user: JwtPayload }).user;
    return this.usersService.getById(sub);
  }
}
