import {
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';

@ValidatorConstraint()
export class IsNestedElementsConstraint<T extends object> implements ValidatorConstraintInterface {
  constructor(protected typeRef: ClassConstructor<T>) {}

  public async validate(value: any, args: ValidationArguments) {
    const validations: any[] = [];

    Object.entries(value).forEach((entry) => {
      validations.push(validate(plainToClass(this.typeRef, entry[1])));
    });
    const process = await Promise.all(validations);
    return process.every((p) => p.length <= 0);
  }

  public defaultMessage(args: ValidationArguments) {
    return `${args.property} error`;
  }
}

export const IsNested = <T extends object>(type: ClassConstructor<T>, validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: new IsNestedElementsConstraint(type),
    });
  };
};
