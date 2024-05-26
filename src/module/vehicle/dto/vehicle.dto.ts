import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  offset?: number;
}

export class CreateVehicleDto {
  @IsString()
  plate: string;

  @IsString()
  model: string;

  // @IsString()
  // year: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
