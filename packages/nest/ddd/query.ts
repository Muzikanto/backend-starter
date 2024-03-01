import { TransformInt } from '@packages/nest';
import { Max, Min } from 'class-validator';

export type IPaginatedQuery = {
  limit: number;
  offset?: number;
};

export class PaginatedQueryDto implements IPaginatedQuery {
  @TransformInt({ default: 10 })
  @Min(0)
  @Max(10_000)
  limit!: number;

  @TransformInt({ default: 0 })
  @Min(0)
  offset?: number;
}

export type IPaginatedResult<T> = {
  rows: T[];
  count: number;
};
