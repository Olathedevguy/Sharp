import React from 'react'
import SideBar from './SideBar'
import { images } from '../../assets/asset'

const Admin = () => {

  const getDate = () =>{
    const today = new Date()
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const formattedDate =today.getDate().toString().padStart(2, '0') +'th,'+' '+ monthNames[today.getMonth()] +' '+ today.getFullYear();
    return formattedDate;
    
  }
  const greetUser = () =>{
    const today = new Date()
    const hour = today.getHours()
    // console.log(hour)
    if (hour >= 5 && hour < 12) {
      return "G'Morning"
  } else if (hour >= 12 && hour < 17) {
      return "G'Afternoon"
  } else if (hour >= 17 && hour < 21) {
      return "G'Evening"
  } else {
      return "G'Night"
  }
  }


  return (
    <div className='flex gap-10'>
      <SideBar />
      <div>

        <div className='mt-10 flex justify-between gap-[630px]'>
        <div>
        <h2 className='text-black font-extrabold text-2xl'>{greetUser() + ' '+ 'Tioluwanimi'}</h2>
        <p className='text-[#808080] text-sm'>Welcome to where you&apos;re fully incharge, start monitoring progress now!</p>
        </div>

      <div className='bg-[#808080] rounded-full w-[65px] h-[65px] flex items-center justify-center'>
        <img className='w-[60px] rounded-full' src={images.defaultProfile} alt="" />
      </div>
      </div>

        <div className='flex items-center gap-2 mt-4'>
          <img className='w-[40px]' src={images.calendar} alt="" />
          <p className='text-sm text-black'>{getDate()}</p>
        </div>
      </div>


    </div>
  )
}

export default Admin
