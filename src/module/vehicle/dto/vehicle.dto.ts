import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class PaginationQueryDto {
  limit?: number;
  offset?: number;
}

export class CreateVehicleDto {
  @IsString()
  plate: string;

  @IsString()
  model: string;

  @IsString()
  year: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
