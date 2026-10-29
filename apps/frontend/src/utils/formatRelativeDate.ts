export const formatRelativeDate = (iso: string): string => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const date = new Date(iso)
  date.setHours(0, 0, 0, 0)

  const diffMs = today.getTime() - date.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'сегодня'
  if (diffDays === 1) return 'вчера'
  if (diffDays < 5) return `${diffDays} дня назад`
  return `${diffDays} дней назад`
}