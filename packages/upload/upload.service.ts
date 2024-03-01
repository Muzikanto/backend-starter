import { Client } from 'minio';
import { Readable as ReadableStream } from 'stream';
import { Inject, Injectable } from '@nestjs/common';
import { IUploadModuleOptions } from '@packages/upload/upload.types';
import { UPLOAD_CONFIG_KEY } from '@packages/upload/upload.inject';

// eslint-disable-next-line
const urlJoin = require('url-join');

const MAIN_BUCKET = 'main';

@Injectable()
class UploadService {
  protected readonly client: Client;

  constructor(@Inject(UPLOAD_CONFIG_KEY) protected readonly config: IUploadModuleOptions) {
    const { publicHost, ...minioConfig } = this.config;

    const minioClient = new Client(minioConfig);

    this.client = minioClient;
  }

  public async init(): Promise<void> {
    const isExists = await this.client.bucketExists(MAIN_BUCKET);

    if (isExists) {
      return;
    }

    await this.client.makeBucket(MAIN_BUCKET, 'eu-west-1');
  }

  public async save(payload: {
    fileName: string;
    folder?: string;
    data: ReadableStream | Buffer;
  }): Promise<{ url: string }> {
    const pathToFile = [payload.folder, payload.fileName].filter(Boolean).join('/');
    await this.client.putObject(MAIN_BUCKET, pathToFile, payload.data);

    const url = urlJoin(
      this.config.publicHost || 'http://' + this.config.endPoint + (this.config.port ? ':' + this.config.port : ''),
      MAIN_BUCKET,
      payload.folder || '',
      payload.fileName
    );

    return {
      url,
    };
  }
}

export default UploadService;
