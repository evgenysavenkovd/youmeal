import { S3Service } from '@api/s3';
import { ICategory } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as random from 'randomstring';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto';
import { Category } from './entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly s3: S3Service
  ) {}

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(
    category: CreateCategoryDto,
    file: Express.Multer.File
  ): Promise<Category> {
    const randomString = random.generate({ length: 8 });
    const imagePath = `categories/${randomString}`;

    const uploadedImage = await this.s3.putObject(imagePath, file);

    return this.categoryRepository.save(
      this.categoryRepository.create({
        ...category,
        imageUrl: uploadedImage.url
      })
    );
  }

  async update(id: number, dto: CreateCategoryDto, file?: Express.Multer.File) {
    const update: Partial<ICategory> = dto;
    if (file) {
      const randomString = random.generate({ length: 8 });
      const imagePath = `categories/${randomString}`;

      const uploadedImage = await this.s3.putObject(imagePath, file);

      update.imageUrl = uploadedImage.url;
    }
    await this.categoryRepository.update(id, update);
    return true;
  }

  async delete(id: number) {
    await this.categoryRepository.delete(id);
    return true;
  }
}
