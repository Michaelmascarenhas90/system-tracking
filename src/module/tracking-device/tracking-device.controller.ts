import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { TrackingDeviceService } from './tracking-device.service';
import {
  CreateTrackingDeviceDto,
  UpdateTrackingDeviceDto,
} from './dto/tracking-device.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { PaginationQueryDto } from './dto/tracking-device.dto';

@Controller('tracking-devices')
@UseGuards(AuthGuard)
export class TrackingDeviceController {
  constructor(private readonly trackingDeviceService: TrackingDeviceService) {}

  @Post(':id')
  async create(
    @Param('id') vehicleId: string,
    @Body() createTrackingDeviceDto: CreateTrackingDeviceDto,
  ) {
    return this.trackingDeviceService.create(
      vehicleId,
      createTrackingDeviceDto,
    );
  }

  @Get(':id')
  async findAll(
    @Param('id') vehicleId: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.trackingDeviceService.findAll(vehicleId, paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackingDeviceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackingDeviceDto: UpdateTrackingDeviceDto,
  ) {
    return this.trackingDeviceService.update(id, updateTrackingDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trackingDeviceService.remove(id);
  }
}
