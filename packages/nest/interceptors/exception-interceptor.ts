import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Logger } from '@packages/logger';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(
    @InjectSentry() private readonly sentry: SentryService,
    @Logger() protected readonly logger: LoggerService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    return next.handle().pipe(
      catchError((err) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user) {
          if (!err.extra) {
            err.extra = {};
          }

          err.extra.user = user.entity.id;
        }

        if (err.status >= 500) {
          this.sentry.error(err.message, err.stack, 'App');
        }

        return throwError(() => {
          return new HttpException(
            {
              statusCode: err.response?.statusCode || err.status || 500,
              errorCode: err.response?.errorCode,
              message: err.response?.message || err.message || 'Something went wrong',
              stack: err.response?.error || err.stack,
              query: request.query,
              body: request.body,
              params: request.params,
              path: request.routerPath,
            },
            err.response?.statusCode || 500
          );
        });
      })
    );
  }
}
