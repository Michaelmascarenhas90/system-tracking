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
import { TrackingHistoryService } from './tracking-history.service';
import {
  CreateTrackingHistoryDto,
  UpdateTrackingHistoryDto,
  PaginationQueryDto,
} from './dto/tracking-history.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('tracking-history')
@UseGuards(AuthGuard)
export class TrackingHistoryController {
  constructor(
    private readonly trackingHistoryService: TrackingHistoryService,
  ) {}

  @Post(':id')
  async create(
    @Param('id') deviceId: string,
    @Body() createTrackingHistoryDto: CreateTrackingHistoryDto,
  ) {
    return this.trackingHistoryService.create(
      deviceId,
      createTrackingHistoryDto,
    );
  }

  @Get(':id')
  async findAll(
    @Param('id') deviceId: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.trackingHistoryService.findAll(deviceId, paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackingHistoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackingHistoryDto: UpdateTrackingHistoryDto,
  ) {
    return this.trackingHistoryService.update(id, updateTrackingHistoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trackingHistoryService.remove(id);
  }
}
