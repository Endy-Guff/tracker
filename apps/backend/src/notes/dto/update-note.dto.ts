import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;

  @IsDateString()
  @IsOptional()
  date?: string;
}
