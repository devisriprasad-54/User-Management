const API_BASE_URL = "http://localhost:4000/user-api"

export const API_ENDPOINTS = {
  getAllUsers: `${API_BASE_URL}/users`,
  getUserById: (id) => `${API_BASE_URL}/users/${id}`,
  createUser: `${API_BASE_URL}/users`,
  updateUser: (id) => `${API_BASE_URL}/users/${id}`,
  deleteUser: (id) => `${API_BASE_URL}/users/${id}`,
  activateUser: (id) => `${API_BASE_URL}/users/${id}`,
  getAllUsersIncludeDeleted: `${API_BASE_URL}/all-users`
}

// Fetch helper function with error handling
export const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || "API request failed")
    }
    
    return data
  } catch (error) {
    throw error
  }
}
