import { TransformFnParams } from 'class-transformer';
import { StringToRegexConvert } from './string-to-regex-convert';

export const StringToRegexTransformer = (params: TransformFnParams): RegExp | null =>
  StringToRegexConvert(params.value);
