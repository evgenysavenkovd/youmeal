import { IUser } from '@common/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(user: IUser) {
    const existingUser = await this.usersRepository.findOneBy({
      login: user.login
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    return this.usersRepository.save(
      this.usersRepository.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      })
    );
  }

  async getAll() {
    return this.usersRepository.find();
  }

  async getByLogin(login: string) {
    return this.usersRepository.findOneBy({ login });
  }

  async getById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
}
