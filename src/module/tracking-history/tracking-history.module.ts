import { Module } from '@nestjs/common';
import { TrackingHistoryService } from './tracking-history.service';
import { TrackingHistoryController } from './tracking-history.controller';
import { PrismaService } from 'src/DB/PrismaService';

@Module({
  imports: [],
  controllers: [TrackingHistoryController],
  providers: [TrackingHistoryService, PrismaService],
})
export class TrackingHistoryModule {}
