import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/DB/PrismaService';
import {
  CreateTrackingHistoryDto,
  UpdateTrackingHistoryDto,
  PaginationQueryDto,
} from './dto/tracking-history.dto';

@Injectable()
export class TrackingHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    deviceId: string,
    createTrackingHistoryDto: CreateTrackingHistoryDto,
  ) {
    const { latitude, longitude } = createTrackingHistoryDto;

    return this.prisma.trackingHistory.create({
      data: {
        longitude,
        latitude,
        deviceId: deviceId,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    });
  }

  async findAll(deviceId: string, paginationQuery: PaginationQueryDto) {
    const { limit = 10, offset = 1 } = paginationQuery;
    const [historys, count] = await this.prisma.$transaction([
      this.prisma.trackingHistory.findMany({
        where: { deviceId },
        skip: Number(offset),
        take: Number(limit),
      }),
      this.prisma.trackingHistory.count(),
    ]);
    const pages = Math.ceil(count / limit);
    const nextPage = offset + limit < count ? offset + limit : null;
    const currentStep = offset / limit + 1;
    return {
      data: historys,
      count,
      pages,
      nextPage,
      currentStep,
    };
  }

  async findOne(id: string) {
    const history = await this.prisma.trackingHistory.findUnique({
      where: { id },
    });
    if (!history) {
      throw new NotFoundException(`Dispositivo com ID ${id} não encontrado.`);
    }
    return history;
  }

  async update(id: string, updateTrackingHistoryDto: UpdateTrackingHistoryDto) {
    return this.prisma.trackingHistory.update({
      where: { id },
      data: updateTrackingHistoryDto,
    });
  }

  async remove(id: string) {
    const history = await this.findOne(id);

    if (!history) {
      throw new NotFoundException(`Historico com ID ${id} não encontrado.`);
    }
    return this.prisma.trackingHistory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
