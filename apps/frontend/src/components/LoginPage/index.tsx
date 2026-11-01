import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { login } from '../../api/auth/api'
import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(loginValue, password)
      navigate('/', { replace: true })
    } catch {
      toast.error('Неверный логин или пароль')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вход</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Логин"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          autoFocus
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}