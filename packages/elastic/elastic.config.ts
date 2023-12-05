import { ConfigService } from '@packages/config/config.service';
import { Injectable } from '@nestjs/common';
import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticConfig implements ElasticsearchOptionsFactory {
  protected readonly node: string;

  constructor(configService: ConfigService) {
    this.node = configService.getString('ELASTIC_URL');
  }

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.node,
    };
  }
}
