import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

type GroupStatus = 'green' | 'yellow' | 'red';

interface WeekBounds {
  start: Date;
  end: Date;
}

function getWeekBounds(isoDate: string): WeekBounds {
  const date = new Date(isoDate);
  const day = date.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const diffToMonday = (day === 0 ? -6 : 1 - day);
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}

function calcStatus(activeDays: number, target: number): GroupStatus {
  if (activeDays >= target) return 'green';
  if (target === 1) return 'red';
  if (activeDays >= Math.ceil(target / 2)) return 'yellow';
  return 'red';
}

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(clientDate: string) {
    const groups = await this.prisma.group.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        notes: {
          select: { date: true, createdAt: true },
        },
      },
    });

    const { start, end } = getWeekBounds(clientDate);

    return groups.map((group) => {
      const weekNotes = group.notes.filter(
        (n) => n.date >= start && n.date <= end,
      );
      const activeDatesSet = new Set(
        weekNotes.map((n) => n.date.toISOString().slice(0, 10)),
      );
      const activeDays = activeDatesSet.size;
      const activeDates = Array.from(activeDatesSet).sort();
      const status = calcStatus(activeDays, group.targetDaysPerWeek);
      const lastNote = group.notes.sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      )[0];

      return {
        id: group.id,
        name: group.name,
        description: group.description,
        targetDaysPerWeek: group.targetDaysPerWeek,
        createdAt: group.createdAt,
        status,
        activeDaysThisWeek: activeDays,
        activeDates,
        lastActivityAt: lastNote?.date ?? null,
      };
    });
  }

  async create(dto: CreateGroupDto) {
    return this.prisma.group.create({ data: dto });
  }

  async update(id: string, dto: UpdateGroupDto) {
    await this.assertExists(id);
    return this.prisma.group.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.assertExists(id);
    await this.prisma.group.delete({ where: { id } });
  }

  private async assertExists(id: string) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException(`Group ${id} not found`);
  }
}
