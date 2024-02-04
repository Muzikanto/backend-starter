import { CommandBase } from '@packages/nest';

export class CreateExampleCommand extends CommandBase {
  constructor(
    public readonly payload: {
      value: number;
    }
  ) {
    super();
  }
}
