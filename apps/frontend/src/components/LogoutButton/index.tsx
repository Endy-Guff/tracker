import { logout } from '../../api/auth/api'
import styles from './LogoutButton.module.scss'

export const LogoutButton = () => {
  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  return (
    <button className={styles.button} onClick={handleLogout} title="Выйти">
      Выйти
    </button>
  )
}