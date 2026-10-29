import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByGroup(groupId: string): Promise<{
        id: string;
        createdAt: Date;
        groupId: string;
        text: string;
        date: Date;
    }[]>;
    create(groupId: string, dto: CreateNoteDto): Promise<{
        id: string;
        createdAt: Date;
        groupId: string;
        text: string;
        date: Date;
    }>;
    update(groupId: string, noteId: string, dto: UpdateNoteDto): Promise<{
        id: string;
        createdAt: Date;
        groupId: string;
        text: string;
        date: Date;
    }>;
    remove(groupId: string, noteId: string): Promise<void>;
    private assertGroupExists;
    private assertNoteExists;
}
