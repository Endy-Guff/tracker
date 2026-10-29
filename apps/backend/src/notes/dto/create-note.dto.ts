import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDateString()
  date: string;
}
