import { IsNotEmpty, IsOptional, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

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

export class CreateTrackingHistoryDto {
  @IsNotEmpty()
  @Type(() => Number)
  latitude: number;

  @IsNotEmpty()
  @Type(() => Number)
  longitude: number;
}

import { PartialType } from '@nestjs/mapped-types';

export class UpdateTrackingHistoryDto extends PartialType(
  CreateTrackingHistoryDto,
) {}
