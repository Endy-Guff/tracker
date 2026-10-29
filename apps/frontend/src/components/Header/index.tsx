import type { Group } from '../../api/groups/types'
import styles from './Header.module.scss'

interface HeaderProps {
  groups: Group[]
}

export const Header = ({ groups }: HeaderProps) => {
  const total = groups.length
  const covered = groups.filter((g) => g.activeDaysThisWeek > 0).length

  return (
    <header className={styles.header}>
      <span className={styles.title}>Трекер</span>
      {total > 0 && (
        <span className={styles.counter}>
          {covered} из {total} охвачено
        </span>
      )}
    </header>
  )
}