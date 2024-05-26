import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/DB/PrismaService';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async existUserForId(id: string) {
    return await this.prisma.user.count({ where: { id } });
  }

  async existUserForEmail(email: string) {
    return await this.prisma.user.count({ where: { email } });
  }

  async create(data: UserDTO) {
    if (await this.existUserForEmail(data.email)) {
      throw new NotAcceptableException('User already exist');
    }

    const hashedPassword = await this.authService.hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    });

    return user;
  }

  async updateUser(id: string, data: UserUpdateDTO) {
    if (!(await this.existUserForId(id))) {
      throw new NotAcceptableException('User not found');
    }

    if (data.email && (await this.existUserForEmail(data.email))) {
      throw new NotAcceptableException('User already exist');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }
}
