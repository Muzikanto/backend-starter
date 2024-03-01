import { CommandBase } from '@packages/nest';

export class CreateLeadCommand extends CommandBase {
  constructor(
    public readonly payload: {
      email: string;
      name: string;
      message: string;
    }
  ) {
    super();
  }
}
