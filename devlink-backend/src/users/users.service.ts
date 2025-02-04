import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseResponse, formatResponse } from 'src/common/helpers/response.helper';
import { Pagination } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getAllUsers(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<BaseResponse<{ data: User[]; pagination: Pagination }>> {
    //  Xây dựng query tìm kiếm
    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') }, // Tìm theo name (không phân biệt chữ hoa/thường)
        { email: new RegExp(search, 'i') }, // Tìm theo email
      ];
    }

    //  Tính toán phân trang
    const skip = (page - 1) * limit;

    //  Lấy danh sách users theo query & pagination
    const users = await this.userModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    //  Tính tổng số users
    const totalUsers = await this.userModel.countDocuments(query).exec();

    return formatResponse(
      { data: users, pagination: { page, limit, total: totalUsers } },
      'Users retrieved successfully',
    );
  }

  async getUserById(id: string): Promise<BaseResponse<User>> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return formatResponse(user, 'User retrieved successfully');
  }

  async createUser(data: CreateUserDto): Promise<BaseResponse<User>> {
    const newUser = new this.userModel(data);
    await newUser.save();
    return formatResponse(newUser, 'User created successfully', 201);
  }

  async updateUser(id: string, data: Partial<User>): Promise<BaseResponse<User>> {
    //  Kiểm tra ID có hợp lệ không
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid user ID format: ${id}`);
    }

    //  Kiểm tra user có tồn tại không
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    //  Kiểm tra nếu email bị trùng (tránh lỗi Unique)
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await this.userModel.findOne({ email: data.email }).exec();
      if (emailExists) {
        throw new BadRequestException(`Email ${data.email} is already taken`);
      }
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    //  Cập nhật user nếu mọi thứ hợp lệ
    return formatResponse(updatedUser, 'User updated successfully');
  }

  async deleteUser(id: string): Promise<BaseResponse<null>> {
    // Kiểm tra id có phải ObjectId hợp lệ không
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid user ID format: ${id}`);
    }

    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return formatResponse(null, 'User deleted successfully', 204);
  }
}
