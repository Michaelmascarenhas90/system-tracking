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

  async findAll(vehicleId: string, paginationQuery: PaginationQueryDto) {
    const { limit = 10, offset = 1 } = paginationQuery;
    const [devices, count] = await this.prisma.$transaction([
      this.prisma.trackingDevice.findMany({
        where: {
          vehicleId,
          deletedAt: null,
        },
        skip: Number(offset),
        take: Number(limit),
      }),
      this.prisma.trackingDevice.count({
        where: {
          vehicleId,
          deletedAt: null, // Adicione esta linha para contar apenas registros não deletados
        },
      }),
    ]);
    const pages = Math.ceil(count / limit);
    const nextPage = offset + limit < count ? offset + limit : null;
    const currentStep = Math.ceil(offset / limit + 1);
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
    const history = await this.findOne(id);

    if (!history) {
      throw new NotFoundException(`Rastreador com ID ${id} não encontrado.`);
    }
    return this.prisma.trackingDevice.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
