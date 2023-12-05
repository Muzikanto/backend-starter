import { TransformFnParams } from 'class-transformer';
import { StringToNumberConvert } from './string-to-number-convert';

export const StringToNumberTransformer = (params: TransformFnParams): number | null =>
  StringToNumberConvert(params.value);
