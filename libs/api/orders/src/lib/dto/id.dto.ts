import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdDto {
  @IsNumber()
  @Transform(({ value }) => {
    const parsed = parseInt(value);
    return isNaN(parsed) ? value : parsed;
  })
  id: number;
}
