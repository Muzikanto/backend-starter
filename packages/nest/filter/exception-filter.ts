import { Catch, RpcExceptionFilter as BaseRpcExceptionFilter, ArgumentsHost, ConsoleLogger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class ExceptionFilter implements BaseRpcExceptionFilter<RpcException> {
  protected readonly logger: ConsoleLogger = new ConsoleLogger();

  catch(exception: RpcException | Error, host: ArgumentsHost): Observable<any> {
    const err = exception instanceof RpcException ? exception.getError() : exception;
    this.logger.error(err, (err as Error).stack);

    return throwError(() => {
      return err;
    });
  }
}
