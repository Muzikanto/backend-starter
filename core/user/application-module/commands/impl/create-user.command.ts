import { CommandBase } from '@packages/nest';

export class CreateUserCommand extends CommandBase {
  constructor(
    public readonly payload: {
      value: number;
    }
  ) {
    super();
  }
}
