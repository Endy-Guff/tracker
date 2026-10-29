import { createBrowserRouter } from 'react-router-dom'
import GroupsPage from './pages/GroupsPage'
import GroupPage from './pages/GroupPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GroupsPage />,
  },
  {
    path: '/groups/:id',
    element: <GroupPage />,
  },
])