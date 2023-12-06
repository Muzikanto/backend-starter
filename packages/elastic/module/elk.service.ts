import { Injectable, LoggerService } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Logger } from '@packages/logger';
import { IElkInsertItem, IElkItem } from '@packages/elastic';

@Injectable()
export class ElkService {
  constructor(
    @Logger() protected readonly logger: LoggerService,
    //
    private readonly elasticsearchService: ElasticsearchService
  ) {
    this.init();
  }

  private init() {
    this.elasticsearchService.indices.exists({ index: 'page' }).then((exists) => {
      if (exists) {
        return;
      }

      this.elasticsearchService.indices.create({ index: 'page' }).then().catch(console.log);
    });
  }

  public async search<T extends Record<string, unknown>>({
    index,
    search,
    match,
  }: {
    index: string;
    search?: string;
    match?: Record<string, string>;
  }): Promise<IElkItem<T>[]> {
    const res = await this.elasticsearchService.search({
      index,
      query: {
        query_string: search ? { query: `${search}*` } : undefined,
        match,
      },
    });

    return res.hits.hits.map((el) => ({
      id: el._id,
      score: el._score || 0,
      source: el._source as T,
    }));
  }

  public async insert<T extends Record<string, unknown>>(index: string, items: IElkInsertItem<T>[]): Promise<void> {
    await this.elasticsearchService.bulk({
      operations: [
        ...items.flatMap((item) => [
          {
            index: { _index: index, _id: item.id },
          },
          item.source,
        ]),
      ],
    });
  }

  async health(): Promise<void> {
    await this.elasticsearchService.info();
  }
}
