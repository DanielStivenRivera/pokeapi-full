import { IsNotEmpty } from 'class-validator';

export class UserChangeStatusDto {
  @IsNotEmpty()
  isActive: boolean;
}
