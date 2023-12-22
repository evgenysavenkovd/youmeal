import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  displayName: string;

  @IsString()
  password: string;
}
