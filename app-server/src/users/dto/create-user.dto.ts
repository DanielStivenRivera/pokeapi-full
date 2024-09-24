import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, { message: 'firstName should only contain letters' })
  firstName: string;
  @ApiProperty({ example: 'Anderson' })
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'secondName should only contain letters',
  })
  secondName?: string;
  @ApiProperty({ example: 'Emily' })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'firstLastName should only contain letters',
  })
  firstLastName: string;
  @ApiProperty({ example: 'Collins' })
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'secondLastName should only contain letters',
  })
  secondLastName?: string;
  @ApiProperty({ example: 'correo@correo.es' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
