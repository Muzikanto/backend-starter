import { ServiceUnavailableException } from '@nestjs/common';

export function MethodExceptionFormatter({ service = 'Internal' }: { service?: string }): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: any, ...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);

        return result;
      } catch (e) {
        if ((e as Record<string, unknown>).code === 'ECONNREFUSED') {
          throw new ServiceUnavailableException(`${service} service does not available`);
        }

        throw e;
      }
    };
  };
}

export function ClassExceptionFormatter({ service = 'Internal' }: { service?: string }) {
  const ignoreKeys: string[] = ['constructor'];

  // eslint-disable-next-line
  return (constructor: new (...args: any) => any): new (...args: any) => any => {
    const propertyKeys = Object.getOwnPropertyNames(constructor.prototype);

    return class extends constructor {
      constructor(...args: any) {
        super(...args);

        const proto = constructor.prototype;

        for (const propertyKey of propertyKeys) {
          const property = constructor.prototype[propertyKey];

          if (typeof property === 'function' && !ignoreKeys.includes(propertyKey)) {
            const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(
              proto,
              propertyKey
            ) as PropertyDescriptor;

            MethodExceptionFormatter({ service })(proto, propertyKey, descriptor);

            Object.defineProperty(this, propertyKey, descriptor);
          }
        }
      }
    };
  };
}
