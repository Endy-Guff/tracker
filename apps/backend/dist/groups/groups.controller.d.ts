import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    findAll(date?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        targetDaysPerWeek: number;
        createdAt: Date;
        status: "green" | "yellow" | "red";
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
}
