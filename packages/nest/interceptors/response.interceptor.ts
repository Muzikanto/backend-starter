import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, object> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    // fix for telegraf
    if ((context as any).contextType === 'telegraf') {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest<FastifyRequest>();

    // fix for metrics
    if (req.url === '/api/metrics') {
      return next.handle();
    }

    const startedAt = new Date().getTime();

    return next.handle().pipe(
      map((data: unknown) => {
        const res = context.switchToHttp().getResponse();
        const endedAt = new Date().getTime();

        return {
          statusCode: res.statusCode,
          data,
          service: {
            startedAt: startedAt,
            serverTime: endedAt,
            duration: endedAt - startedAt,
          },
        };
      })
    );
  }
}
