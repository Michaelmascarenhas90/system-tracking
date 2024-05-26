import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DB/PrismaService';
import {
  CreateTrackingDeviceDto,
  UpdateTrackingDeviceDto,
} from './dto/tracking-device.dto';
import { PaginationQueryDto } from './dto/tracking-device.dto';

@Injectable()
export class TrackingDeviceService {
  constructor(private prisma: PrismaService) {}

  async create(
    vehicleId: string,
    createTrackingDeviceDto: CreateTrackingDeviceDto,
  ) {
    const { identifier, status } = createTrackingDeviceDto;

    return this.prisma.trackingDevice.create({
      data: {
        identifier,
        status,
        vehicleId: vehicleId,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    });
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = paginationQuery;
    const [devices, count] = await this.prisma.$transaction([
      this.prisma.trackingDevice.findMany({
        skip: offset,
        take: limit,
      }),
      this.prisma.trackingDevice.count(),
    ]);
    const pages = Math.ceil(count / limit);
    const nextPage = offset + limit < count ? offset + limit : null;
    const currentStep = offset / limit + 1;
    return {
      data: devices,
      count,
      pages,
      nextPage,
      currentStep,
    };
  }

  async findOne(id: string) {
    const device = await this.prisma.trackingDevice.findUnique({
      where: { id },
    });
    if (!device) {
      throw new NotFoundException(`Dispositivo com ID ${id} não encontrado.`);
    }
    return device;
  }

  async update(id: string, updateTrackingDeviceDto: UpdateTrackingDeviceDto) {
    return this.prisma.trackingDevice.update({
      where: { id },
      data: updateTrackingDeviceDto,
    });
  }

  async remove(id: string) {
    return this.prisma.trackingDevice.delete({ where: { id } });
  }
}
