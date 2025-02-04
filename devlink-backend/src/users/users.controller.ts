import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with search & pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of users with pagination' })
  @ApiQuery({ name: 'search', required: false }) // ✅ Làm `search` thành optional
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  getAllUsers(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.getAllUsers(search, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() body: { name: string; email: string; age?: number }) {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid ID format or email taken' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiBody({ type: UpdateUserDto })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
