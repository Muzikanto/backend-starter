import { ModuleMetadata } from '@nestjs/common';

export type IElkAsyncOptions = Pick<ModuleMetadata, 'imports' | 'providers'>;
