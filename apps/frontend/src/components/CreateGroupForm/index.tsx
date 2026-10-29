import { useState } from 'react'
import { useCreateGroup } from '../../api/groups/hooks'
import styles from './CreateGroupForm.module.scss'

export const CreateGroupForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [target, setTarget] = useState(3)

  const { mutate, isPending } = useCreateGroup()

  const reset = () => {
    setName('')
    setDescription('')
    setTarget(3)
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    mutate(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        targetDaysPerWeek: target,
      },
      { onSuccess: reset },
    )
  }

  if (!isOpen) {
    return (
      <button className={styles.addButton} onClick={() => setIsOpen(true)}>
        + Добавить направление
      </button>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <input
        className={styles.input}
        placeholder="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className={styles.targetLabel}>
        Дней в неделю: {target}
        <input
          type="range"
          min={1}
          max={7}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className={styles.range}
        />
      </label>
      <div className={styles.actions}>
        <button type="submit" className={styles.save} disabled={isPending || !name.trim()}>
          {isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" className={styles.cancel} onClick={reset}>
          Отмена
        </button>
      </div>
    </form>
  )
}