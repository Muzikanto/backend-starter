import { IGetUserDto } from '../types/dto.types';
import { TransformID } from '@packages/nest';

export class GetUserDto implements IGetUserDto {
  @TransformID()
  userId!: string;
}
