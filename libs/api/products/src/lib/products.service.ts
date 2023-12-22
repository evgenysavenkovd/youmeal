import { S3Service } from '@api/s3';
import { IProduct } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as random from 'randomstring';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto';
import { Product } from './entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly s3: S3Service
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productsRepository.find({ loadRelationIds: true });
  }

  async getById(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  async create(
    dto: CreateProductDto,
    file: Express.Multer.File
  ): Promise<Product> {
    const randomString = random.generate({ length: 8 });
    const imagePath = `products/${randomString}`;

    const uploadedImage = await this.s3.putObject(imagePath, file);

    return this.productsRepository.save(
      this.productsRepository.create({
        ...dto,
        imageUrl: uploadedImage.url
      })
    );
  }

  async update(id: number, dto: CreateProductDto, file?: Express.Multer.File) {
    const update: Partial<IProduct> = dto;
    if (file) {
      const randomString = random.generate({ length: 8 });
      const imagePath = `categories/${randomString}`;

      const uploadedImage = await this.s3.putObject(imagePath, file);

      update.imageUrl = uploadedImage.url;
    }
    await this.productsRepository.update(id, update);
    return true;
  }

  async delete(id: number) {
    await this.productsRepository.delete(id);
    return true;
  }
}
