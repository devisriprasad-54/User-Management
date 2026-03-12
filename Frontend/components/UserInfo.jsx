import { useLocation, useNavigate } from "react-router"
import React from 'react'
import { useUser } from '../src/hooks/useUser'

function UserInfo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { deleteUser, activateUser } = useUser()
  const userInfo = location.state?.userInfo || null

  const handleGoBack = () => {
    navigate("/users-list")
  }

  const handleEdit = () => {
    navigate(`/edit-user/${userInfo._id}`, { state: { userInfo } })
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${userInfo.name}?`)) {
      try {
        await deleteUser(userInfo._id)
        navigate("/users-list")
      } catch (error) {
        console.log("Error deleting user:", error)
      }
    }
  }

  const handleActivate = async () => {
    try {
      await activateUser(userInfo._id)
      navigate("/users-list")
    } catch (error) {
      console.log("Error activating user:", error)
    }
  }

  const formatDate = (date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-50">
      <button
        onClick={handleGoBack}
        className="mb-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
      >
        ← Back to Users List
      </button>

      {userInfo ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">User Details</h1>

          <div className="space-y-4 mb-8">
            <div className="border-b pb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Name</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">{userInfo.name}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Email</p>
              <p className="text-lg text-blue-600 mt-1">{userInfo.email}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Phone</p>
              <p className="text-lg text-gray-800 mt-1">{userInfo.phone}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Age</p>
              <p className="text-lg text-gray-800 mt-1">{userInfo.age} years</p>
            </div>

            <div className="pb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Date of Birth</p>
              <p className="text-lg text-gray-800 mt-1">{formatDate(userInfo.DOB)}</p>
            </div>

            <div className="pb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Member Since</p>
              <p className="text-lg text-gray-800 mt-1">{formatDate(userInfo.createdAt)}</p>
            </div>

            {userInfo.status === false && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-800 font-semibold">⚠ This user is deleted/deactivated</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleEdit}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2'
            >
              ✎ Edit User
            </button>

            {userInfo.status ? (
              <button
                onClick={handleDelete}
                className='bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2'
              >
                🗑 Delete User
              </button>
            ) : (
              <button
                onClick={handleActivate}
                className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2'
              >
                ✓ Restore User
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-yellow-800">
          <p className="font-semibold text-center">No user information available</p>
          <button
            onClick={handleGoBack}
            className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInfo
