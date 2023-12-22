import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mime from 'mime-types';
import sharp from 'sharp';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: this.configService.get('YANDEX_STORAGE_REGION'),
    endpoint: this.configService.get('YANDEX_STORAGE_ENDPOINT'),
    credentials: {
      accessKeyId: this.configService.get(
        'YANDEX_STORAGE_STATIC_KEY_ID'
      ) as string,
      secretAccessKey: this.configService.get(
        'YANDEX_STORAGE_STATIC_KEY_SECRET'
      ) as string
    }
  });
  private bucket = this.configService.get('YANDEX_STORAGE_BUCKET') as string;
  private basePath = this.configService.get(
    'YANDEX_STORAGE_BASE_PATH'
  ) as string;

  private cdnUrl = this.configService.get('CDN_URL') as string;

  constructor(private configService: ConfigService) {}

  async putObject(path: string, file: Express.Multer.File) {
    try {
      const imageExtension = mime.extension(file.mimetype) || '';
      const fullPath = [this.basePath, path]
        .join('/')
        .concat('.', imageExtension);
      const imageBuffer = await sharp(file.buffer).resize(800).toBuffer();
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: fullPath,
          Body: imageBuffer,
          ContentType: file.mimetype,
          ACL: ObjectCannedACL.public_read
        })
      );
      const url = this.getImageUrl(fullPath);
      return {
        path: fullPath,
        url
      };
    } catch (err) {
      console.error(err);
      throw new HttpException('Could not upload image', 500);
    }
  }

  private getImageUrl(imagePath: string) {
    return [this.cdnUrl, imagePath].join('/');
  }
}
