import { ArgumentMetadata, ValidationPipe as BaseValidationPipe } from '@nestjs/common';

export class ValidationPipe extends BaseValidationPipe {
  transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'body' || metadata.type === 'query') {
      delete value.ak;
    }

    return super.transform(value, metadata);
  }
}
