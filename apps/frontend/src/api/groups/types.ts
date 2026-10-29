export type GroupStatus = 'red' | 'yellow' | 'green'

export interface Group {
  id: string
  name: string
  description?: string
  targetDaysPerWeek: number
  createdAt: string
  status: GroupStatus
  activeDaysThisWeek: number
  activeDates: string[]
  lastActivityAt: string | null
}

export interface CreateGroupDto {
  name: string
  description?: string
  targetDaysPerWeek: number
}

export interface UpdateGroupDto {
  name?: string
  description?: string
  targetDaysPerWeek?: number
}