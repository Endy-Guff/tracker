import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('groups/:groupId/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(@Param('groupId') groupId: string) {
    return this.notesService.findByGroup(groupId);
  }

  @Post()
  create(@Param('groupId') groupId: string, @Body() dto: CreateNoteDto) {
    return this.notesService.create(groupId, dto);
  }

  @Patch(':noteId')
  update(
    @Param('groupId') groupId: string,
    @Param('noteId') noteId: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.update(groupId, noteId, dto);
  }

  @Delete(':noteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('groupId') groupId: string, @Param('noteId') noteId: string) {
    return this.notesService.remove(groupId, noteId);
  }
}
