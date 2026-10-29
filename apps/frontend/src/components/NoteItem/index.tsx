import { useState } from 'react'
import type { Note } from '../../api/notes/types'
import { useUpdateNote, useDeleteNote } from '../../api/notes/hooks'
import styles from './NoteItem.module.scss'

interface NoteItemProps {
  note: Note
  groupId: string
}

export const NoteItem = ({ note, groupId }: NoteItemProps) => {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(note.text)
  const [date, setDate] = useState(note.date.slice(0, 10))

  const updateMutation = useUpdateNote(groupId)
  const deleteMutation = useDeleteNote(groupId)

  const handleSave = () => {
    if (!text.trim()) return
    updateMutation.mutate(
      { noteId: note.id, dto: { text: text.trim(), date } },
      { onSuccess: () => setEditing(false) },
    )
  }

  const handleCancel = () => {
    setText(note.text)
    setDate(note.date.slice(0, 10))
    setEditing(false)
  }

  const handleDelete = () => {
    deleteMutation.mutate(note.id)
  }

  if (editing) {
    return (
      <div className={styles.item}>
        <textarea
          className={styles.textInput}
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
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={updateMutation.isPending || !text.trim()}
          >
            {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Отмена
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.item} onClick={() => setEditing(true)}>
      <div className={styles.content}>
        <p className={styles.text}>{note.text}</p>
        <span className={styles.date}>{note.date.slice(0, 10)}</span>
      </div>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation()
          handleDelete()
        }}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? '...' : '×'}
      </button>
    </div>
  )
}