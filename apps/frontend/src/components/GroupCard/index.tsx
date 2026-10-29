import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Group } from '../../api/groups/types'
import { useUpdateGroup, useDeleteGroup } from '../../api/groups/hooks'
import { StatusBadge } from '../StatusBadge'
import { WeekCells } from '../WeekCells'
import { ConfirmDialog } from '../ConfirmDialog'
import { formatRelativeDate } from '../../utils/formatRelativeDate'
import styles from './GroupCard.module.scss'

interface GroupCardProps {
  group: Group
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(group.name)
  const [description, setDescription] = useState(group.description ?? '')
  const [target, setTarget] = useState(group.targetDaysPerWeek)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateMutation = useUpdateGroup()
  const deleteMutation = useDeleteGroup()

  const handleSave = () => {
    if (!name.trim()) return
    updateMutation.mutate(
      {
        id: group.id,
        dto: {
          name: name.trim(),
          description: description.trim() || undefined,
          targetDaysPerWeek: target,
        },
      },
      { onSuccess: () => setEditing(false) },
    )
  }

  const handleCancel = () => {
    setName(group.name)
    setDescription(group.description ?? '')
    setTarget(group.targetDaysPerWeek)
    setEditing(false)
  }

  const handleDelete = () => {
    deleteMutation.mutate(group.id, {
      onSuccess: () => setDeleteOpen(false),
    })
  }

  if (editing) {
    return (
      <div className={styles.card}>
        <input
          className={styles.editInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название"
          autoFocus
        />
        <input
          className={styles.editInput}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание (необязательно)"
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
        <div className={styles.editActions}>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={updateMutation.isPending || !name.trim()}
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
    <>
      <div className={styles.card}>
        <Link to={`/groups/${group.id}`} className={styles.link}>
          <div className={styles.header}>
            <h3 className={styles.name}>{group.name}</h3>
            <StatusBadge status={group.status} />
          </div>

          <WeekCells activeDates={group.activeDates} status={group.status} />

          <div className={styles.footer}>
            <span className={styles.target}>
              {group.activeDaysThisWeek} / {group.targetDaysPerWeek} дней
            </span>
            {group.lastActivityAt && (
              <span className={styles.lastActivity}>
                {formatRelativeDate(group.lastActivityAt)}
              </span>
            )}
          </div>
        </Link>

        <div className={styles.cardActions}>
          <button className={styles.actionBtn} onClick={() => setEditing(true)}>
            Изменить
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => setDeleteOpen(true)}
          >
            Удалить
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Удалить направление?"
        description={`Группа «${group.name}» и все её заметки будут удалены.`}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}