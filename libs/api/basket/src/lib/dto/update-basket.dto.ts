import { IsNumber, ValidateNested } from 'class-validator';

export class UpdateBasketDto {
  @ValidateNested({ each: true })
  items: UpdateBasketItemDto[];
}

export class UpdateBasketItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  qty: number;
}
