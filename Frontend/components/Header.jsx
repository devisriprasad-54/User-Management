import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='flex justify-between items-center bg-orange-500 px-6 py-3'>

      {/* Logo */}
      <img 
        className='h-20 w-20 rounded-full object-cover'
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3mycvmtjinugeTsXQ9wRYS5p4W802Gxxg6Q&s" 
        alt="logo" 
      />

      {/* Navigation */}
      <nav>
        <ul className='flex gap-10 text-white font-semibold'>

          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                isActive ? "text-black border-b-2 border-black" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/add-user"
              className={({ isActive }) =>
                isActive ? "text-black border-b-2 border-black" : ""
              }
            >
              Add User
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/users-list"
              className={({ isActive }) =>
                isActive ? "text-black border-b-2 border-black" : ""
              }
            >
              Users List
            </NavLink>
          </li>

        </ul>
      </nav>

    </div>
  )
}

export default Header