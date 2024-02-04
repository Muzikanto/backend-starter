import { IExampleDto } from '@core/example/domain';
import { TransformDate, TransformID } from '@packages/nest';

export class ExampleDto<TDate = number> implements IExampleDto<TDate> {
  @TransformID()
  id!: string;

  @TransformDate()
  createdAt!: TDate;
}
