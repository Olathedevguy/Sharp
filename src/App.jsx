import React, { useState } from 'react'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/admin/Admin'
import Users from './components/admin/Users'
import Upload from './components/admin/Upload'
import Setting from './components/admin/Setting'
import AdminAuthPage from './components/admin/AdminAuthPage'
import Test from './test/Test.jsx'
import Cart from './components/Cart.jsx'
import { ToastContainer } from 'react-toastify'
import ProductPage from './components/ProductPage.jsx'

const App = () => {

  const [isPopupOpen, setIsPopupOpen] =  useState(false);
  const [isAdminLoginSuccessful, setIsAdminLoginSuccessful] =  useState(false)
  const navigate = useNavigate()
  
  const adminRoutes = ['/admin', '/admin/auth', '/admin/users', '/admin/upload', '/admin/settings', ]


  const displayNav = () =>{
    if(!adminRoutes.includes(window.location.pathname)){
      return <Navbar />
    }
  }

  const handleAdminSuccess = () =>{
    setIsAdminLoginSuccessful(true)
    navigate('/admin')
  }

  return (
    <>
    <div className='relative scroll'>
      {/* <Navbar /> */}
      {/* <Auth /> */}
      {
        displayNav()
      }
 
 <ToastContainer />

      
      
      <Routes>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/' element={<Home isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>}/>
      <Route path='/signUp' element={<Auth />} />
        <Route path = '/admin' element={isAdminLoginSuccessful ? <Admin /> : <Navigate to='/admin/auth'/> } />
        <Route path='/admin/users' element={<Users />}/>
        <Route path='/admin/upload' element={<Upload />}/>
        <Route path='/admin/settings' element={<Setting />}/>
        <Route path='/admin/auth' element={<AdminAuthPage isAdminLoginSuccessful={isAdminLoginSuccessful} handleAdminSuccess={handleAdminSuccess}/>} />
        <Route path='/test' element={<Test />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>

    </div> 

      </>
   
  )
}

export default App