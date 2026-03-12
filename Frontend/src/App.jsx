import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from '../components/RootLayout'
import Home from '../components/Home'
import AddUser from '../components/AddUser'
import UserInfo from '../components/UserInfo'
import UsersList from '../components/UsersList'
import EditUser from '../components/EditUser'

const routerObj = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: "add-user",
        element: <AddUser />
      },
      {
        path: "users-list",
        element: <UsersList />
      }
    ]
  },
  {
    path: "/user-data/:id",
    element: <UserInfo />
  },
  {
    path: "/edit-user/:id",
    element: <EditUser />
  }
])

function App() {
  return <RouterProvider router={routerObj}></RouterProvider>
}

export default App
