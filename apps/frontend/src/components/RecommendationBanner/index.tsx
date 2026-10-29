import { Link } from 'react-router-dom'
import type { Group } from '../../api/groups/types'
import styles from './RecommendationBanner.module.scss'

interface RecommendationBannerProps {
  group: Group
}

export const RecommendationBanner = ({ group }: RecommendationBannerProps) => (
  <Link to={`/groups/${group.id}`} className={styles.banner}>
    <span className={styles.label}>Рекомендация на сегодня</span>
    <span className={styles.name}>{group.name}</span>
    <span className={styles.hint}>
      {group.activeDaysThisWeek} из {group.targetDaysPerWeek} дней на этой неделе
    </span>
  </Link>
)