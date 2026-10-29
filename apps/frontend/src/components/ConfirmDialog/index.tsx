import * as Dialog from '@radix-ui/react-dialog'
import styles from './ConfirmDialog.module.scss'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  isPending?: boolean
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isPending,
}: ConfirmDialogProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Dialog.Description className={styles.description}>
          {description}
        </Dialog.Description>
        <div className={styles.actions}>
          <button
            className={styles.confirm}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? 'Удаление...' : 'Удалить'}
          </button>
          <Dialog.Close asChild>
            <button className={styles.cancel}>Отмена</button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)