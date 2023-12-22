import { JwtPayload } from '@common/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBasketDto } from './dto';
import { Basket, BasketItem } from './entities';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(BasketItem)
    private readonly basketItemRepository: Repository<BasketItem>,
    private readonly jwtService: JwtService
  ) {}

  async getBasket(id: number): Promise<Basket | null> {
    return this.basketRepository.findOneBy({ id });
  }

  async changeBasketQuantity(
    { items }: UpdateBasketDto,
    id?: number
  ): Promise<BasketItem[]> {
    return this.basketItemRepository.save(
      items.map(({ productId, qty }) =>
        this.basketItemRepository.create({
          quantity: qty,
          basket: { id },
          product: { id: productId }
        })
      )
    );
  }

  async createBasket(): Promise<Basket> {
    return this.basketRepository.save(this.basketRepository.create({}));
  }

  async clearBasket(basketId: number) {
    return this.basketItemRepository.delete({ basketId });
  }

  async createBasketToken(basket: Basket): Promise<string> {
    const payload: JwtPayload = { sub: basket.id };
    return this.jwtService.signAsync(payload, { expiresIn: '10y' });
  }

  async getBasketIdFromToken(token: string): Promise<number> {
    try {
      const { sub } = await this.jwtService.verifyAsync<JwtPayload>(token);
      return sub;
    } catch {
      throw new BadRequestException('Invalid basket token');
    }
  }
}
