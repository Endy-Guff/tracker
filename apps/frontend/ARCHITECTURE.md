# Frontend Architecture

## Подход

Pages-oriented архитектура. Проект маленький (2 страницы, мало фичей, команда 1–2 человека) — feature-слои и сложные абстракции не нужны. Всё крутится вокруг страниц.

## Стек

| Слой | Инструмент |
|------|------------|
| Фреймворк | React |
| Роутинг | React Router DOM (`createBrowserRouter`) |
| Данные / кэш | TanStack Query (React Query) |
| HTTP-клиент | ky |
| UI-примитивы | Radix UI (headless) |
| Стили | SCSS modules |
| Тосты | Sonner |
| Сборка | Vite |
| Пакетный менеджер | pnpm |

## Структура папок

```
src/
  api/
    groups/
      api.ts        ← fetch-функции: getGroups, createGroup, updateGroup, deleteGroup
      types.ts      ← Group, GroupStatus, DTO-типы
      hooks.ts      ← useGroups, useCreateGroup, useUpdateGroup, useDeleteGroup
    notes/
      api.ts        ← getNotes, createNote, updateNote, deleteNote
      types.ts      ← Note, DTO-типы
      hooks.ts      ← useNotes, useCreateNote, useUpdateNote, useDeleteNote
  components/
    ui/             ← Radix-обёртки со стилями, без бизнес-логики
      Button/
      Input/
      Dialog/
  pages/
    GroupsPage/
      components/
        Header/           ← счётчик «N из M направлений охвачено»
        RecommendationBanner/
        GroupCard/
        GroupForm/        ← инлайн-форма создания/редактирования группы
        StatusDot/        ← цветная точка статуса (red/yellow/green)
        WeekCells/        ← 7 ячеек пн–вс текущей недели
      index.tsx
    GroupPage/
      components/
        NoteItem/
        NoteForm/         ← инлайн-форма создания/редактирования заметки
      index.tsx
  router.tsx    ← createBrowserRouter, маршруты / и /groups/:id
  App.tsx       ← QueryClientProvider + RouterProvider + Toaster
  main.tsx
```

## Ключевые решения

### API-слой (`api/`)

Всё что относится к сущности — в одной папке: fetch-функции, TypeScript-типы, React Query хуки. Не привязываем к страницам — запросы переиспользуются (например, при добавлении новых фич).

### Роутинг

`createBrowserRouter` без loaders. Фетчинг — через React Query в компонентах, loaders дублировали бы кэш.

### Инвалидация кэша

| Действие | Инвалидируемые ключи |
|----------|----------------------|
| Мутация заметки (create/update/delete) | `['notes', groupId]` + `['groups']` |
| Мутация группы (create/update/delete) | `['groups']` |

Инвалидация `['groups']` при мутации заметок нужна: статус группы (`status`, `activeDaysThisWeek`) вычисляется бэкендом и приходит из `GET /groups` — после изменения заметок он устаревает.

### `components/ui`

Только Radix-обёртки с SCSS и компоненты без бизнес-логики. `StatusDot` и `WeekCells` — в `GroupsPage/components/`, т.к. несут доменную семантику.

### Header

Часть `GroupsPage` — отдельного общего хедера нет. Данные для счётчика N/M берёт из `useGroups()` (тот же кэш что и список групп на странице, лишнего запроса нет).