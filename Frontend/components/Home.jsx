import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 sm:p-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Welcome to User Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your users efficiently with our easy-to-use application
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-2xl font-semibold text-blue-900 mb-3">📋 View Users</h3>
              <p className="text-gray-700 mb-4">Browse all users in a beautiful card layout</p>
              <button
                onClick={() => navigate('/users-list')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                View List
              </button>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-2xl font-semibold text-green-900 mb-3">➕ Add User</h3>
              <p className="text-gray-700 mb-4">Create a new user with all necessary details</p>
              <button
                onClick={() => navigate('/add-user')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Add New
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Features</h3>
            <ul className="text-gray-700 space-y-2 text-left max-w-2xl mx-auto">
              <li>✓ Add new users with validation</li>
              <li>✓ View all users in an attractive card layout</li>
              <li>✓ Click on any user to view detailed information</li>
              <li>✓ Edit user information</li>
              <li>✓ Delete and restore users</li>
              <li>✓ Real-time data management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
