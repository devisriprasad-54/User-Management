import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../src/hooks/useUser'

function UsersList() {
  const navigate = useNavigate()
  const { users, loading, error, fetchAllUsers, deleteUser, activateUser } = useUser()
  const [showDeletedUsers, setShowDeletedUsers] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchAllUsers(showDeletedUsers).catch(() => {})
  }, [showDeletedUsers, fetchAllUsers])

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        setDeletingId(user._id)
        await deleteUser(user._id)
      } catch (error) {
        console.log("Error deleting user:", error)
      } finally {
        setDeletingId(null)
      }
    }
  }

  const handleActivateUser = async (user) => {
    try {
      setDeletingId(user._id)
      await activateUser(user._id)
    } catch (error) {
      console.log("Error activating user:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const gotoUserDetails = (user) => {
    navigate(`/user-data/${user._id}`, { state: { userInfo: user } })
  }

  const gotoEditUser = (user) => {
    navigate(`/edit-user/${user._id}`, { state: { userInfo: user } })
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-xl font-bold text-gray-700'>Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-red-50 border border-red-200 p-6 rounded-lg max-w-md'>
          <p className='text-red-800 font-semibold text-center'>{error}</p>
          <button
            onClick={() => fetchAllUsers(showDeletedUsers)}
            className='w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const filteredUsers = showDeletedUsers ? users.filter(u => !u.status) : users.filter(u => u.status)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {showDeletedUsers ? "Deleted Users" : "Users List"}
          </h1>
          <button
            onClick={() => setShowDeletedUsers(!showDeletedUsers)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${showDeletedUsers ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
          >
            {showDeletedUsers ? "Show Active" : "Show Deleted"}
          </button>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">
              {showDeletedUsers ? "No deleted users found" : "No active users found"}
            </p>
            {!showDeletedUsers && (
              <button
                onClick={() => navigate('/add-user')}
                className='mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition'
              >
                Add First User
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredUsers.map(user => (
              <div key={user._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => gotoUserDetails(user)}>
                  <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="text-gray-600 text-sm">Age: {user.age}</p>
                  <p className="text-gray-600 text-sm">Phone: {user.phone}</p>
                </div>
                
                <div className="bg-gray-100 p-3 flex gap-2 justify-between">
                  <button
                    onClick={() => gotoEditUser(user)}
                    className='flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded transition'
                  >
                    ✎ Edit
                  </button>
                  
                  {user.status ? (
                    <button
                      onClick={() => handleDeleteUser(user)}
                      disabled={deletingId === user._id}
                      className='flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded transition disabled:opacity-50'
                    >
                      {deletingId === user._id ? '...' : '🗑 Delete'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivateUser(user)}
                      disabled={deletingId === user._id}
                      className='flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-1 px-3 rounded transition disabled:opacity-50'
                    >
                      {deletingId === user._id ? '...' : '✓ Restore'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersList