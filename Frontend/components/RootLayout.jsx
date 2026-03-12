import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className='mx-10'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout
