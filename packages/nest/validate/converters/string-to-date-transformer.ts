import { TransformFnParams } from 'class-transformer';
import { StringToDateConvert } from './string-to-date-convert';

export const StringToDateTransformer = (params: TransformFnParams): Date | null => StringToDateConvert(params.value);
