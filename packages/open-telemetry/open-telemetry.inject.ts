import { Inject } from '@nestjs/common';

export const OPEN_TELEMETRY_TOKEN = 'OPEN_TELEMETRY_TOKEN';

export const InjectOtel = () => Inject(OPEN_TELEMETRY_TOKEN);
