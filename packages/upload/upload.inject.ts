import { Inject } from '@nestjs/common';

export const UPLOAD_CONFIG_KEY = 'UPLOAD_CONFIG_KEY';

export const InjectUploadConfig = Inject(UPLOAD_CONFIG_KEY);
