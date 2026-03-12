import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className='bg-amber-500 text-center py-4 mt-8'>
      <p className='text-white font-semibold'>
        © {currentYear} User Management App. All rights reserved.
      </p>
      <p className='text-white text-sm mt-1'>
        Built with React & Node.js
      </p>
    </div>
  )
}

export default Footer
