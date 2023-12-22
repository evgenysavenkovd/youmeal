import { IOrder, IOrderAddress } from '@common/interfaces';
import { IsIn, IsString, ValidateIf, ValidateNested } from 'class-validator';

export class OrderAddressDto implements IOrderAddress {
  @IsString()
  street: string;

  @IsString()
  floor: string;

  @IsString()
  intercom: string;
}

export class CreateOrderDto implements Omit<IOrder, 'id' | 'items' | 'status'> {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @IsIn(['delivery', 'pickup'] as IOrder['deliveryType'][])
  deliveryType: IOrder['deliveryType'];

  @ValidateNested()
  @ValidateIf((dto: CreateOrderDto) => dto.deliveryType === 'delivery')
  address?: OrderAddressDto;
}
