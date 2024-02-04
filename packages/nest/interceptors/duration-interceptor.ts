import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`Execute time: ${Date.now() - now}ms`);
      })
    );
  }
}
