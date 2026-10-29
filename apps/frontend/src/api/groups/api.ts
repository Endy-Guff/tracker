import ky from 'ky'
import type { Group, CreateGroupDto, UpdateGroupDto } from './types'

const BASE = '/api'

export const getGroups = (): Promise<Group[]> =>
  ky.get(`${BASE}/groups`).json()

export const createGroup = (dto: CreateGroupDto): Promise<Group> =>
  ky.post(`${BASE}/groups`, { json: dto }).json()

export const updateGroup = (id: string, dto: UpdateGroupDto): Promise<Group> =>
  ky.patch(`${BASE}/groups/${id}`, { json: dto }).json()

export const deleteGroup = (id: string): Promise<void> =>
  ky.delete(`${BASE}/groups/${id}`).then(() => undefined)