import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getNotes, createNote, updateNote, deleteNote } from './api'
import { GROUPS_KEY } from '../groups/hooks'
import type { CreateNoteDto, UpdateNoteDto } from './types'

const notesKey = (groupId: string) => ['notes', groupId] as const

export const useNotes = (groupId: string) =>
  useQuery({
    queryKey: notesKey(groupId),
    queryFn: () => getNotes(groupId),
  })

export const useCreateNote = (groupId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateNoteDto) => createNote(groupId, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notesKey(groupId) })
      qc.invalidateQueries({ queryKey: GROUPS_KEY })
    },
    onError: () => toast.error('Не удалось создать заметку'),
  })
}

export const useUpdateNote = (groupId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ noteId, dto }: { noteId: string; dto: UpdateNoteDto }) =>
      updateNote(groupId, noteId, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notesKey(groupId) })
      qc.invalidateQueries({ queryKey: GROUPS_KEY })
    },
    onError: () => toast.error('Не удалось обновить заметку'),
  })
}

export const useDeleteNote = (groupId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (noteId: string) => deleteNote(groupId, noteId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notesKey(groupId) })
      qc.invalidateQueries({ queryKey: GROUPS_KEY })
    },
    onError: () => toast.error('Не удалось удалить заметку'),
  })
}