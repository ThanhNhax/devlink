import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'Jane Doe', description: 'New user name' })
  name?: string;

  @ApiPropertyOptional({ example: 'janedoe@example.com', description: 'New user email' })
  email?: string;

  @ApiPropertyOptional({ example: 30, description: 'New user age' })
  age?: number;
}
