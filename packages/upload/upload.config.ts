import { Injectable } from '@nestjs/common';
import { IUploadModuleOptions, IUploadOptionsFactory } from '@packages/upload/upload.types';
import { ConfigService } from '@packages/config';

@Injectable()
export class UploadConfig implements IUploadOptionsFactory {
  public readonly UPLOAD_HOST: string;
  public readonly UPLOAD_PORT: number;
  public readonly UPLOAD_ACCESS_KEY: string;
  public readonly UPLOAD_SECRET_KEY: string;
  public readonly UPLOAD_URL: string;

  constructor(configService: ConfigService) {
    this.UPLOAD_HOST = configService.getString('UPLOAD_HOST');
    this.UPLOAD_PORT = configService.getNumber('UPLOAD_PORT');
    this.UPLOAD_ACCESS_KEY = configService.getString('UPLOAD_ACCESS_KEY');
    this.UPLOAD_SECRET_KEY = configService.getString('UPLOAD_SECRET_KEY');
    this.UPLOAD_URL = configService.getString('UPLOAD_URL');
  }

  createUploadOptions(): IUploadModuleOptions {
    return {
      endPoint: this.UPLOAD_HOST.replace('http://', '').replace('https://', ''),
      port: this.UPLOAD_PORT,
      useSSL: false,
      accessKey: this.UPLOAD_ACCESS_KEY,
      secretKey: this.UPLOAD_SECRET_KEY,
      publicHost: this.UPLOAD_URL,
    };
  }
}
