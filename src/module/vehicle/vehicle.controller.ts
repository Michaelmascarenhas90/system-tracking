import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { PaginationQueryDto } from './dto/vehicle.dto';

@Controller('vehicles')
@UseGuards(AuthGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Req() req, @Body() createVehicleDto: CreateVehicleDto) {
    const userId = req.user.id;

    // console.log('bateu aqui', userId);
    return this.vehicleService.create(userId, createVehicleDto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto, @Req() req) {
    const userId = req.user.id;
    return this.vehicleService.findAll(userId, paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.vehicleService.findOne(id, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.vehicleService.update(id, updateVehicleDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.vehicleService.remove(id, userId);
  }
}
