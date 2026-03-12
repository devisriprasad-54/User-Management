import React, { createContext, useState, useCallback } from 'react'
import { API_ENDPOINTS, fetchAPI } from '../Api/apiConfig'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchAllUsers = useCallback(async (includeDeleted = false) => {
    try {
      setLoading(true)
      setError("")
      const url = includeDeleted ? API_ENDPOINTS.getAllUsersIncludeDeleted : API_ENDPOINTS.getAllUsers
      const data = await fetchAPI(url)
      setUsers(data.payload || [])
      return data.payload || []
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const addUser = useCallback(async (userObj) => {
    try {
      setError("")
      const data = await fetchAPI(API_ENDPOINTS.createUser, {
        method: "POST",
        body: JSON.stringify(userObj)
      })
      setUsers(prev => [...prev, data.payload])
      return data.payload
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const updateUser = useCallback(async (id, userObj) => {
    try {
      setError("")
      const data = await fetchAPI(API_ENDPOINTS.updateUser(id), {
        method: "PUT",
        body: JSON.stringify(userObj)
      })
      setUsers(prev => prev.map(u => u._id === id ? data.payload : u))
      return data.payload
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const deleteUser = useCallback(async (id) => {
    try {
      setError("")
      const data = await fetchAPI(API_ENDPOINTS.deleteUser(id), {
        method: "DELETE"
      })
      setUsers(prev => prev.filter(u => u._id !== id))
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const activateUser = useCallback(async (id) => {
    try {
      setError("")
      const data = await fetchAPI(API_ENDPOINTS.activateUser(id), {
        method: "PATCH"
      })
      setUsers(prev => prev.map(u => u._id === id ? data.payload : u))
      return data.payload
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const getUserById = useCallback((id) => {
    return users.find(u => u._id === id) || null
  }, [users])

  return (
    <UserContext.Provider value={{
      users,
      loading,
      error,
      fetchAllUsers,
      addUser,
      updateUser,
      deleteUser,
      activateUser,
      getUserById,
      setUsers,
      setError
    }}>
      {children}
    </UserContext.Provider>
  )
}
