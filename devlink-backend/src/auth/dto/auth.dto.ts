import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
    enum: ['admin', 'user'],
    required: false,
  })
  @IsOptional()
  @IsIn(['admin', 'user'])
  role?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'johndoe@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
