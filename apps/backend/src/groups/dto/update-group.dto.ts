import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @Max(7)
  @IsOptional()
  targetDaysPerWeek?: number;
}
