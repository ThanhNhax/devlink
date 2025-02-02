import { IsString, IsEmail, IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsInt({ message: 'Age must be a number' })
  @Min(18, { message: 'Age must be at least 18' })
  age?: number;
}
