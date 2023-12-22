import { Transform, TransformFnParams } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  displayName: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  compound: string[];

  @IsNumber()
  @Transform(transformNumber)
  weight: number;

  @IsNumber()
  @Transform(transformNumber)
  calorieValue: number;

  @IsNumber()
  @Transform(transformNumber)
  price: number;

  @IsNumber()
  @Transform(transformNumber)
  category: number;
}

function transformNumber({ value }: TransformFnParams) {
  const transformed = parseFloat(value);
  if (!isNaN(transformed)) return transformed;
  return value;
}
