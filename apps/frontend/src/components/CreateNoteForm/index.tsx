import { useState } from 'react'
import { useCreateNote } from '../../api/notes/hooks'
import styles from './CreateNoteForm.module.scss'

interface CreateNoteFormProps {
  groupId: string
}

const todayISO = () => new Date().toISOString().slice(0, 10)

export const CreateNoteForm = ({ groupId }: CreateNoteFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [date, setDate] = useState(todayISO)

  const { mutate, isPending } = useCreateNote(groupId)

  const reset = () => {
    setText('')
    setDate(todayISO())
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    mutate({ text: text.trim(), date }, { onSuccess: reset })
  }

  if (!isOpen) {
    return (
      <button className={styles.addButton} onClick={() => setIsOpen(true)}>
        + Добавить заметку
      </button>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textInput}
        placeholder="Чем занимались?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        autoFocus
      />
      <input
        className={styles.dateInput}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.save} disabled={isPending || !text.trim()}>
          {isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" className={styles.cancel} onClick={reset}>
          Отмена
        </button>
      </div>
    </form>
  )
}