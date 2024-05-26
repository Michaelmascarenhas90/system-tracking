import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { PrismaService } from 'src/DB/PrismaService';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService, AuthGuard],
})
export class VehicleModule {}
