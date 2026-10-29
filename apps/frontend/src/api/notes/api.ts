import ky from 'ky'
import type { Note, CreateNoteDto, UpdateNoteDto } from './types'

const BASE = '/api'

export const getNotes = (groupId: string): Promise<Note[]> =>
  ky.get(`${BASE}/groups/${groupId}/notes`).json()

export const createNote = (groupId: string, dto: CreateNoteDto): Promise<Note> =>
  ky.post(`${BASE}/groups/${groupId}/notes`, { json: dto }).json()

export const updateNote = (groupId: string, noteId: string, dto: UpdateNoteDto): Promise<Note> =>
  ky.patch(`${BASE}/groups/${groupId}/notes/${noteId}`, { json: dto }).json()

export const deleteNote = (groupId: string, noteId: string): Promise<void> =>
  ky.delete(`${BASE}/groups/${groupId}/notes/${noteId}`).then(() => undefined)