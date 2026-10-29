import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByGroup(groupId: string) {
    await this.assertGroupExists(groupId);
    return this.prisma.note.findMany({
      where: { groupId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(groupId: string, dto: CreateNoteDto) {
    await this.assertGroupExists(groupId);
    return this.prisma.note.create({
      data: {
        groupId,
        text: dto.text,
        date: new Date(dto.date),
      },
    });
  }

  async update(groupId: string, noteId: string, dto: UpdateNoteDto) {
    await this.assertNoteExists(groupId, noteId);
    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        ...(dto.text !== undefined && { text: dto.text }),
        ...(dto.date !== undefined && { date: new Date(dto.date) }),
      },
    });
  }

  async remove(groupId: string, noteId: string) {
    await this.assertNoteExists(groupId, noteId);
    await this.prisma.note.delete({ where: { id: noteId } });
  }

  private async assertGroupExists(groupId: string) {
    const group = await this.prisma.group.findUnique({ where: { id: groupId } });
    if (!group) throw new NotFoundException(`Group ${groupId} not found`);
  }

  private async assertNoteExists(groupId: string, noteId: string) {
    const note = await this.prisma.note.findFirst({
      where: { id: noteId, groupId },
    });
    if (!note) throw new NotFoundException(`Note ${noteId} not found`);
  }
}
