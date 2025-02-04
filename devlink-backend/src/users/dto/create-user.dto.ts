import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' }) // 🔥 Kiểm tra email hợp lệ
  email: string;

  @ApiPropertyOptional({ example: 25, description: 'User age (optional)' })
  @IsOptional()
  @IsInt({ message: 'Age must be a number' })
  @Min(18, { message: 'Age must be at least 18' })
  age?: number;
}
