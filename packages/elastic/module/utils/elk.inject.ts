import { Inject } from '@nestjs/common';

export const ELK_SERVICE_KEY = 'ELK_SERVICE_KEY';

export const InjectElkService = () => Inject(ELK_SERVICE_KEY);
