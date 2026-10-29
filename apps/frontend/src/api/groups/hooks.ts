import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getGroups, createGroup, updateGroup, deleteGroup } from './api'
import type { CreateGroupDto, UpdateGroupDto } from './types'

export const GROUPS_KEY = ['groups'] as const

export const useGroups = () =>
  useQuery({
    queryKey: GROUPS_KEY,
    queryFn: getGroups,
  })

export const useCreateGroup = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => qc.invalidateQueries({ queryKey: GROUPS_KEY }),
    onError: () => toast.error('Не удалось создать группу'),
  })
}

export const useUpdateGroup = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateGroupDto }) =>
      updateGroup(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: GROUPS_KEY }),
    onError: () => toast.error('Не удалось обновить группу'),
  })
}

export const useDeleteGroup = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => qc.invalidateQueries({ queryKey: GROUPS_KEY }),
    onError: () => toast.error('Не удалось удалить группу'),
  })
}

export type { CreateGroupDto, UpdateGroupDto }