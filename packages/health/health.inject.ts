import { Inject } from '@nestjs/common';

export const HEALTH_CONFIG_KEY = 'HEALTH_CONFIG_KEY';
export const InjectHealthConfig = (): ParameterDecorator => Inject(HEALTH_CONFIG_KEY);
