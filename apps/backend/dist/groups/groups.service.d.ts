import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
type GroupStatus = 'green' | 'yellow' | 'red';
export declare class GroupsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(clientDate: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        targetDaysPerWeek: number;
        createdAt: Date;
        status: GroupStatus;
        activeDaysThisWeek: number;
        activeDates: string[];
        lastActivityAt: Date;
    }[]>;
    create(dto: CreateGroupDto): Promise<{
        name: string;
        description: string | null;
        targetDaysPerWeek: number;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateGroupDto): Promise<{
        name: string;
        description: string | null;
        targetDaysPerWeek: number;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<void>;
    private assertExists;
}
export {};
