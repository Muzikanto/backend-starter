import { IAuthLoginDto } from '@core/auth/application-module/types';
import { TransformString } from '@packages/nest';

export class LoginDto implements IAuthLoginDto {
  @TransformString()
  email!: string;

  @TransformString()
  password!: string;
}
