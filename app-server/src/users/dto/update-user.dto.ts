import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  secondName?: string;
  @ApiProperty()
  firstLastName: string;
  @ApiProperty()
  secondLastName?: string;
}
