import React from 'react'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/admin/Admin'

const App = () => {
  return (
    <>
    <div className=''>
      {/* <Auth /> */}
      {
        window.location.pathname != '/admin' && <Navbar />
      }
      
      
      <Routes>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/signUp' element={<Auth />} />
        <Route path = '/admin' element={<Admin />} />
      </Routes>

    </div> 

      </>
   
  )
}

export default App
