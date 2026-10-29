import { useGroups } from '../../api/groups/hooks'
import { GroupCard } from '../../components/GroupCard'
import { CreateGroupForm } from '../../components/CreateGroupForm'
import { Header } from '../../components/Header'
import { RecommendationBanner } from '../../components/RecommendationBanner'
import { getRecommendation } from '../../utils/getRecommendation'
import styles from './GroupsPage.module.scss'

const GroupsPage = () => {
  const { data: groups, isLoading, isError } = useGroups()

  if (isLoading) return <div className={styles.status}>Загрузка...</div>
  if (isError) return <div className={styles.status}>Ошибка загрузки</div>

  const recommendation = groups ? getRecommendation(groups) : null

  return (
    <>
      {groups && <Header groups={groups} />}

      <div className={styles.page}>
        {recommendation && <RecommendationBanner group={recommendation} />}

        <h2 className={styles.title}>Мои направления</h2>

        {groups?.length === 0 && (
          <p className={styles.empty}>Пока нет направлений. Добавьте первое!</p>
        )}

        <div className={styles.list}>
          {groups?.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
          <CreateGroupForm />
        </div>
      </div>
    </>
  )
}

export default GroupsPage