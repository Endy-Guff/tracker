import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getMe } from '../../api/auth/api'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getMe()
      .then(() => {
        setIsAuthenticated(true)
        if (location.pathname === '/login') {
          navigate('/', { replace: true })
        }
      })
      .catch(() => {
        setIsAuthenticated(false)
        if (location.pathname !== '/login') {
          navigate('/login', { replace: true })
        }
      })
      .finally(() => setIsChecking(false))
  }, [])

  if (isChecking) return null

  return <>{children}</>
}