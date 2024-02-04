import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StringToDateTransformer } from './converters/string-to-date-transformer';
import { StringToNumberTransformer } from './converters/string-to-number-transformer';
import { StringToRegexTransformer } from './converters/string-to-regex-transformer';
import { DtoMessages } from './dto.messages';
import { IsNested } from './validate-nested';
import { StringToBoolTransformer } from './converters/string-to-bool-transformer';

export const TransformDate =
  ({ nullable }: { nullable?: boolean } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToDateTransformer)(target, propertyKey);
    IsDate({ message: DtoMessages.isDateValid })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: Number, nullable, example: '1677774079007' })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: Number, nullable, example: '1677774079007' })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformInt =
  ({
    nullable,
    description,
    default: defaultValue,
  }: { nullable?: boolean; description?: string; default?: any } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToNumberTransformer)(target, propertyKey);
    IsInt({ message: DtoMessages.isInt })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ nullable, description, default: defaultValue })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ nullable, description, default: defaultValue })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformFloat =
  ({ nullable, description }: { nullable?: boolean; description?: string } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToNumberTransformer)(target, propertyKey);
    IsNumber({})(target, propertyKey);

    if (!nullable) {
      ApiProperty({ nullable, description })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ nullable, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformString =
  ({ nullable, description }: { nullable?: boolean; description?: string } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    IsString({ message: DtoMessages.isString })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ nullable, description })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ nullable, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformID =
  ({ nullable }: { nullable?: boolean } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    IsString({ message: DtoMessages.isString })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ nullable, example: 'id' })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ nullable, example: 'id' })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformRegEx =
  ({ nullable }: { nullable?: boolean } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToRegexTransformer)(target, propertyKey);

    if (!nullable) {
      ApiProperty({ nullable })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ nullable })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformBoolean =
  ({ nullable, default: defaultValue }: { nullable?: boolean; default?: boolean } = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToBoolTransformer)(target, propertyKey);
    IsBoolean({ message: DtoMessages.isBoolean })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ nullable, default: defaultValue })(target, propertyKey);
      IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
    } else {
      ApiPropertyOptional({ nullable, default: defaultValue })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformEnum =
  // eslint-disable-next-line


    (v: object, { nullable }: { nullable?: boolean } = {}): PropertyDecorator =>
    (target: object, propertyKey: string | symbol) => {
      IsEnum(v, { message: DtoMessages.isEnum })(target, propertyKey);

      if (!nullable) {
        ApiProperty({ nullable, enum: v, description: Object.keys(v).join(', ') })(target, propertyKey);
        IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
      } else {
        ApiPropertyOptional({ nullable, enum: v, description: Object.keys(v).join(', ') })(target, propertyKey);
        IsOptional()(target, propertyKey);
      }

      return target[propertyKey as keyof typeof target];
    };

export const TransformArray =
  // eslint-disable-next-line


    <A = any, R = any>(
      Convert: new (v: A) => R,
      { nullable, example, description }: { nullable?: boolean; example?: any; description?: string } = {}
    ): PropertyDecorator =>
    (target: object, propertyKey: string | symbol) => {
      Transform((params) => {
        let arr = params?.value;

        if (typeof arr === 'string' && arr[0] === '[') {
          arr = JSON.parse(arr);
        }

        return arr?.map((el: A) => new Convert(el));
      });
      // IsArray({ message: DtoMessages.isArray })(target, propertyKey);
      Type(() => Convert)(target, propertyKey);

      if (!nullable) {
        ApiProperty({ nullable, type: Convert, isArray: true, example, description })(target, propertyKey);
        IsNotEmpty({ message: 'DtoMessages.isNotEmpty' })(target, propertyKey);
      } else {
        ApiPropertyOptional({ nullable, type: Convert, isArray: true, example, description })(target, propertyKey);
        IsOptional()(target, propertyKey);
      }

      return target[propertyKey as keyof typeof target];
    };

export const TransformObject =
  // eslint-disable-next-line


    <A = string, R = string>(
      Convert: new (v: A) => R,
      { nullable, description }: { nullable?: boolean; description?: string } = {}
    ): PropertyDecorator =>
    (target: object, propertyKey: string | symbol) => {
      Transform((params) => new Convert(params.value));
      IsObject({})(target, propertyKey);
      Type(() => Convert)(target, propertyKey);
      ValidateNested({ each: true })(target, propertyKey);

      if (!nullable) {
        ApiProperty({ nullable, type: Convert, description })(target, propertyKey);
        IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
      } else {
        ApiPropertyOptional({ nullable, type: Convert, description })(target, propertyKey);
        IsOptional()(target, propertyKey);
      }

      return target[propertyKey as keyof typeof target];
    };

export const TransformNested =
  // eslint-disable-next-line


    <A = string, R extends object = object>(
      Convert: new (v: A) => R,
      { nullable }: { nullable?: boolean } = {}
    ): PropertyDecorator =>
    (target: object, propertyKey: string | symbol) => {
      Transform((params) => new Convert(params.value));
      IsObject({})(target, propertyKey);
      Type(() => Convert)(target, propertyKey);
      ValidateNested({ each: true })(target, propertyKey);
      IsNested(Convert);

      if (!nullable) {
        ApiProperty({ nullable, type: Convert, isArray: true, title: 'Object map' })(target, propertyKey);
        IsNotEmpty({ message: DtoMessages.isNotEmpty })(target, propertyKey);
      } else {
        ApiPropertyOptional({ nullable, type: Convert, isArray: true, title: 'Object map' })(target, propertyKey);
        IsOptional()(target, propertyKey);
      }

      return target[propertyKey as keyof typeof target];
    };
