import { BasketService } from '@api/basket';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto';
import { Order, OrderItem } from './entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly basketService: BasketService
  ) {}

  async getOrder(id: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async createOrder(basketId: number, dto: CreateOrderDto): Promise<Order> {
    const basket = await this.basketService.getBasket(basketId);
    if (!basket)
      throw new InternalServerErrorException('Could not find basket');

    const order = await this.orderRepository.save(
      this.orderRepository.create({ ...dto, status: 'pending' })
    );

    const orderItems = await this.orderItemRepository.save(
      basket.items.map(({ product, quantity }) =>
        this.orderItemRepository.create({
          quantity,
          productId: product.id,
          orderId: order.id
        })
      )
    );

    order.items = orderItems;

    await this.basketService.clearBasket(basketId);

    return order;
  }

  async completeOrder(id: number) {
    return this.orderRepository.update({ id }, { status: 'completed' });
  }

  async cancelOrder(id: number) {
    return this.orderRepository.update({ id }, { status: 'canceled' });
  }
}
