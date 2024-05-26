import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DB/PrismaService';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { PaginationQueryDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        ...createVehicleDto,
        user: { connect: { id: userId } },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    });
  }

  async findAll(userId: string, paginationQuery: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = paginationQuery;
    return this.prisma.vehicle.findMany({
      where: { userId, deletedAt: null },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string, userId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle || vehicle.userId !== userId) {
      throw new NotFoundException(
        `Veículo com ID ${id} não encontrado para este usuário.`,
      );
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: string, userId: string) {
    const vehicle = await this.findOne(id, userId);

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }
    return this.prisma.vehicle.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
