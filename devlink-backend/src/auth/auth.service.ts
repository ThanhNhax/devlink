import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // async register(name: string, email: string, password: string) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await this.prisma.user.create({
  //     data: { name, email, password: hashedPassword },
  //   });
  //   console.log({ user });
  //   const token = jwt.sign(
  //     {
  //       userId: user.id,
  //     },
  //     process.env.JWT_SECRET,
  //     { expiresIn: '7d' },
  //   );
  //   return { user, token };
  // }
  // async login(email: string, password: string) {
  //   const user = await this.prisma.user.findUnique({ where: { email } });
  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new Error('Invalid credentials');
  //   }
  //   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  //   return { user, token };
  // }
}
