import { MethodLogger, SERVICE_LOGGER_KEY } from './logger.method-decorator';
import { Logger } from './logger.decorator';

// eslint-disable-next-line
export function ClassLogger(opts: { debug?: boolean } = { debug: true }) {
  const ignoreKeys: string[] = ['constructor'];

  // eslint-disable-next-line
  return (constructor: new (...args: any) => any): new (...args: any) => any => {
    Logger(constructor.name)(constructor.prototype, SERVICE_LOGGER_KEY);

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

            // eslint-disable-next-line
            MethodLogger({ debug: opts.debug })(proto, propertyKey, descriptor);

            Object.defineProperty(this, propertyKey, descriptor);
          }
        }
      }
    };
  };
}
