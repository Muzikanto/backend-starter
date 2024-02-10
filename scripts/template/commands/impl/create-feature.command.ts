import { CommandBase } from '@packages/nest';

export class CreateFeatureCommand extends CommandBase {
  constructor(
    public readonly payload: {
      value: number;
    }
  ) {
    super();
  }
}
