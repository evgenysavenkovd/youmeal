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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  getAll() {
    return this.categoriesService.getAll();
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.categoriesService.create(dto, file);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.categoriesService.update(+id, dto, file);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(+id);
  }
}
