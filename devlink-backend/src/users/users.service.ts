import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // 🔥 1️⃣ Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new BadRequestException(`Email ${createUserDto.email} is already taken`);
    }

    // 🔥 2️⃣ Nếu email chưa tồn tại, tạo user mới
    return new this.userModel(createUserDto).save();
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    // 1️⃣ Kiểm tra ID có hợp lệ không
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid user ID format: ${id}`);
    }

    // 2️⃣ Kiểm tra user có tồn tại không
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // 3️⃣ Kiểm tra nếu email bị trùng (tránh lỗi Unique)
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await this.userModel.findOne({ email: data.email }).exec();
      if (emailExists) {
        throw new BadRequestException(`Email ${data.email} is already taken`);
      }
    }

    // 4️⃣ Cập nhật user nếu mọi thứ hợp lệ
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    // Kiểm tra id có phải ObjectId hợp lệ không
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid user ID format: ${id}`);
    }

    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}
