import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../AuthProvider'
import { LogoutButton } from '../LogoutButton'

export const AppLayout = () => (
  <AuthProvider>
    <LogoutButton />
    <Outlet />
  </AuthProvider>
)