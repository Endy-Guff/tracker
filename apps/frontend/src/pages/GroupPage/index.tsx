import { Link, useParams } from 'react-router-dom'
import { useNotes } from '../../api/notes/hooks'
import { useGroups } from '../../api/groups/hooks'
import { NoteItem } from '../../components/NoteItem'
import { CreateNoteForm } from '../../components/CreateNoteForm'
import styles from './GroupPage.module.scss'

const GroupPage = () => {
  const { id } = useParams<{ id: string }>()
  const groupId = id!

  const { data: groups } = useGroups()
  const group = groups?.find((g) => g.id === groupId)

  const { data: notes, isLoading, isError } = useNotes(groupId)

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>← Назад</Link>

      <h1 className={styles.title}>{group?.name ?? 'Загрузка...'}</h1>
      {group?.description && (
        <p className={styles.description}>{group.description}</p>
      )}

      {isLoading && <div className={styles.status}>Загрузка заметок...</div>}
      {isError && <div className={styles.status}>Ошибка загрузки</div>}

      <div className={styles.list}>
        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} groupId={groupId} />
        ))}
      </div>

      {!isLoading && <CreateNoteForm groupId={groupId} />}
    </div>
  )
}

export default GroupPage