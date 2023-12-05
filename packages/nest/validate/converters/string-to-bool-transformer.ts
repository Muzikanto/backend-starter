import { TransformFnParams } from 'class-transformer';
import { StringToBoolConvert } from './string-to-bool-convert';

export const StringToBoolTransformer = (params: TransformFnParams): boolean | null => StringToBoolConvert(params.value);
