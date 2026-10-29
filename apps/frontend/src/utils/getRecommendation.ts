import type { Group } from '../api/groups/types'

export const getRecommendation = (groups: Group[]): Group | null => {
  const needsAttention = groups
    .filter((g) => g.status === 'red' || g.status === 'yellow')
    .sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'red' ? -1 : 1
      }
      const distA = a.targetDaysPerWeek - a.activeDaysThisWeek
      const distB = b.targetDaysPerWeek - b.activeDaysThisWeek
      return distB - distA
    })

  return needsAttention[0] ?? null
}