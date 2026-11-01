import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { AppLayout } from './components/AppLayout'
import GroupsPage from './pages/GroupsPage'
import GroupPage from './pages/GroupPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <GroupsPage />,
      },
      {
        path: '/groups/:id',
        element: <GroupPage />,
      },
    ],
  },
])