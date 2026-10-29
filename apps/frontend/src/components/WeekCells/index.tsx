import type { GroupStatus } from '../../api/groups/types'
import styles from './WeekCells.module.scss'

interface WeekCellsProps {
  activeDates: string[]
  status: GroupStatus
}

const DAY_LABELS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const getMondayOfCurrentWeek = (): Date => {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

const getWeekDates = (): string[] => {
  const monday = getMondayOfCurrentWeek()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.toISOString().slice(0, 10)
  })
}

export const WeekCells = ({ activeDates, status }: WeekCellsProps) => {
  const weekDates = getWeekDates()
  const activeSet = new Set(activeDates)

  return (
    <div className={styles.week}>
      {weekDates.map((date, i) => {
        const isActive = activeSet.has(date)
        return (
          <div
            key={date}
            className={`${styles.cell} ${isActive ? styles[status] : styles.inactive}`}
          >
            <span className={styles.label}>{DAY_LABELS[i]}</span>
          </div>
        )
      })}
    </div>
  )
}