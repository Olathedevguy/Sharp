import React, { useState } from 'react'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/admin/Admin'

const App = () => {

  const [isPopupOpen, setIsPopupOpen] =  useState(false);

  return (
    <>
    <div className='relative'>
      {/* <Auth /> */}
      {
        window.location.pathname != '/admin' && <Navbar setIsPopupOpen={setIsPopupOpen}/>
      }
      {
        isPopupOpen ? (<Auth isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/> && <Home />) :(<Navigate to='/' />) 
  
      }     

      
      
      <Routes>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/' element={<Home />}/>
      <Route path='/signUp' element={<Auth isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>} />
        <Route path = '/admin' element={<Admin />} />
      </Routes>

    </div> 

      </>
   
  )
}

export default App