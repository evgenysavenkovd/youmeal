import { AuthModule } from '@api/auth';
import { BasketModule } from '@api/basket';
import { CategoriesModule } from '@api/categories';
import { typeOrmConfig } from '@api/config';
import { OrdersModule } from '@api/orders';
import { ProductsModule } from '@api/products';
import { S3Module } from '@api/s3';
import { UsersModule } from '@api/users';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.env.backend.local'
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    AuthModule,
    S3Module,
    CategoriesModule,
    ProductsModule,
    BasketModule,
    OrdersModule
  ]
})
export class AppModule {}
