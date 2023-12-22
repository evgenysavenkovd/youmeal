import { Cookies } from '@api/common';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Get()
  async getBasket(@Cookies('basket') token?: string) {
    if (!token) return { items: [] };
    const id = await this.basketService.getBasketIdFromToken(token);
    return this.basketService.getBasket(id);
  }

  @Post('/')
  async updateBasket(
    @Body() dto: UpdateBasketDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies('basket') token?: string
  ) {
    let id: number;
    if (token) {
      id = await this.basketService.getBasketIdFromToken(token);
    } else {
      const createdBasket = await this.basketService.createBasket();
      id = createdBasket.id;
      const createdToken = await this.basketService.createBasketToken(
        createdBasket
      );
      response.cookie('basket', createdToken);
    }
    await this.basketService.changeBasketQuantity(dto, id);
    return { status_code: HttpStatus.OK };
  }
}
