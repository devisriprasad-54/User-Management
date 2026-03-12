import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '../src/hooks/useUser'

function EditUser() {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { updateUser } = useUser()
  const userInfo = location.state?.userInfo || null

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
    defaultValues: userInfo ? {
      name: userInfo.name,
      email: userInfo.email,
      age: userInfo.age,
      phone: userInfo.phone,
      dob: new Date(userInfo.DOB).toISOString().split('T')[0]
    } : {}
  })

  const onFormSubmit = async (userObj) => {
    try {
      setloading(true)
      const data = { ...userObj, DOB: userObj.dob }
      delete data.dob

      await updateUser(id, data)
      reset()
      navigate(`/user-data/${id}`, { state: { userInfo: { ...userInfo, ...data } } })
    } catch (error) {
      console.log("Error:", error)
    } finally {
      setloading(false)
    }
  }

  if (!userInfo) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-yellow-50 border border-yellow-200 p-6 rounded-lg max-w-md'>
          <p className='text-yellow-800 font-semibold text-center mb-4'>No user information available</p>
          <button
            onClick={() => navigate('/users-list')}
            className='w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition'
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-xl font-bold text-gray-700'>Updating user...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Edit User</h1>
        <p className="text-gray-600 text-center mb-6">Update user details</p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
                pattern: { value: /^[a-zA-Z\s]*$/, message: "Name can only contain letters" }
              })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email format" }
              })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                placeholder="25"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 1, message: "Age must be at least 1" },
                  max: { value: 120, message: "Age must be less than 120" }
                })}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                placeholder="1234567890"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: { value: /^\d{10}$/, message: "Phone must be 10 digits" }
                })}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              {...register("dob", {
                required: "Date of birth is required"
              })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-md"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={() => navigate(`/user-data/${id}`, { state: { userInfo } })}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditUser
