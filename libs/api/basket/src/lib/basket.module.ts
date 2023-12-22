import { jwtConfig } from '@api/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket, BasketItem } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket, BasketItem]),
    JwtModule.registerAsync(jwtConfig)
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService]
})
export class BasketModule {}
