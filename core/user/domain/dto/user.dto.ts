import { TransformDate, TransformID } from '@packages/nest';
import { IUserDto } from '../types/user.dto.types';

export class UserDto<TDate = number> implements IUserDto<TDate> {
  @TransformID()
  id!: string;

  @TransformDate()
  createdAt!: TDate;
}
