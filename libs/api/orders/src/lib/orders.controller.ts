import { BasketService } from '@api/basket';
import { AuthGuard, Cookies } from '@api/common';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreateOrderDto, IdDto } from './dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly basketService: BasketService
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Post('/')
  async createOrder(
    @Body() dto: CreateOrderDto,
    @Cookies('basket') basketToken?: string
  ) {
    if (!basketToken) throw new ForbiddenException('No basket specified');
    const basketId = await this.basketService.getBasketIdFromToken(basketToken);
    return this.ordersService.createOrder(basketId, dto);
  }

  @Post('/:id/complete')
  @UseGuards(AuthGuard)
  async completeOrder(@Param() { id }: IdDto) {
    return this.ordersService.completeOrder(id);
  }
  @Post('/:id/cancel')
  @UseGuards(AuthGuard)
  async cancelOrder(@Param() { id }: IdDto) {
    return this.ordersService.cancelOrder(id);
  }
}
