import type { GroupStatus } from '../../api/groups/types'
import styles from './StatusBadge.module.scss'

interface StatusBadgeProps {
  status: GroupStatus
}

const LABELS: Record<GroupStatus, string> = {
  green: 'В норме',
  yellow: 'Отстаёт',
  red: 'Критично',
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`${styles.badge} ${styles[status]}`}>{LABELS[status]}</span>
)