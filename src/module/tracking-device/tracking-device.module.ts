import { Module } from '@nestjs/common';
import { TrackingDeviceService } from './tracking-device.service';
import { TrackingDeviceController } from './tracking-device.controller';
import { PrismaService } from 'src/DB/PrismaService';

@Module({
  imports: [],
  controllers: [TrackingDeviceController],
  providers: [TrackingDeviceService, PrismaService],
})
export class TrackingDeviceModule {}
