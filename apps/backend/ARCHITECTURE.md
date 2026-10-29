# Backend Architecture

## Структура монорепо

```
apps/
  backend/   — независимый NestJS проект, pnpm
  frontend/  — независимый Vite/React проект, pnpm
```

## Модульная структура

```
src/
  groups/
    dto/create-group.dto.ts
    dto/update-group.dto.ts
    groups.controller.ts
    groups.service.ts
    groups.module.ts
  notes/
    dto/create-note.dto.ts
    dto/update-note.dto.ts
    notes.controller.ts     ← @Controller('groups/:groupId/notes')
    notes.service.ts
    notes.module.ts
  prisma/
    prisma.service.ts
    prisma.module.ts
  app.module.ts
  main.ts
```

## Зависимости модулей

- `GroupsModule` → импортирует `PrismaModule`
- `NotesModule` → импортирует `PrismaModule`
- `GroupsModule` НЕ знает о `NotesModule`
- `NotesModule` НЕ знает о `GroupsModule`
- Cascade delete заметок при удалении группы — на уровне Prisma schema (`onDelete: Cascade`)

## main.ts

- Порт: `3001` (из ConfigService / `.env`)
- `app.enableCors()` — TODO: ограничить origin при деплое
- `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })`
- `@nestjs/config` — ConfigModule глобальный, ConfigService инжектируется везде

## Ошибки

Дефолтный NestJS формат — поле `message` присутствует всегда:

```json
{
  "statusCode": 400,
  "message": ["name must not be empty"],
  "error": "Bad Request"
}
```