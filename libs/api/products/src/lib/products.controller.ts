import { AuthGuard } from '@api/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  getAll() {
    return this.productsService.getAll();
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productsService.create(dto, file);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.productsService.update(+id, dto, file);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
