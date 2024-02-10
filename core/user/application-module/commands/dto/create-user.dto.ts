import { ICreateUserDto } from '../types/dto.types';
import { TransformInt } from '@packages/nest';

export class CreateUserDto implements ICreateUserDto {
  @TransformInt()
  value!: number;
}
