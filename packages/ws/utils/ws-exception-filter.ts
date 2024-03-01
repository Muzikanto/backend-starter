import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WsResponse } from '@packages/ws/utils/ws.response';

@Catch(HttpException, WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: HttpException | WsException, host: ArgumentsHost) {
    const callback = host.getArgs().pop();

    if (typeof callback === 'function') {
      if (exception instanceof WsException) {
        return callback(new WsResponse({ status: 400, error: exception }));
      }

      callback(new WsResponse({ status: exception.getStatus(), error: exception }));
    }
  }
}
