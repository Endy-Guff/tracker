"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function getWeekBounds(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDay();
    const diffToMonday = (day === 0 ? -6 : 1 - day);
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { start: monday, end: sunday };
}
function calcStatus(activeDays, target) {
    if (activeDays >= target)
        return 'green';
    if (target === 1)
        return 'red';
    if (activeDays >= Math.ceil(target / 2))
        return 'yellow';
    return 'red';
}
let GroupsService = class GroupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(clientDate) {
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
            const weekNotes = group.notes.filter((n) => n.date >= start && n.date <= end);
            const activeDatesSet = new Set(weekNotes.map((n) => n.date.toISOString().slice(0, 10)));
            const activeDays = activeDatesSet.size;
            const activeDates = Array.from(activeDatesSet).sort();
            const status = calcStatus(activeDays, group.targetDaysPerWeek);
            const lastNote = group.notes.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
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
    async create(dto) {
        return this.prisma.group.create({ data: dto });
    }
    async update(id, dto) {
        await this.assertExists(id);
        return this.prisma.group.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.assertExists(id);
        await this.prisma.group.delete({ where: { id } });
    }
    async assertExists(id) {
        const group = await this.prisma.group.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException(`Group ${id} not found`);
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map