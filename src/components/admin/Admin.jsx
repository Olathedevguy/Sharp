import React, { useContext } from 'react'
import SideBar from './SideBar'
import { images } from '../../assets/asset'

import { LineChart, ThumbsUp, UploadCloudIcon, User } from 'lucide-react'
import { GlobalContext } from '../../context/Appcontext'

const Admin = () => {

  const {userList, uploadList} = useContext(GlobalContext)

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
      <div className='md:ml-[250px] ml-0 mx-auto md:px-0 px-6 md:mt-0 mt-12 md:mb-0 mb-16 transition-all duration-300 ease-in-out'>

  <div className='mt-8 flex md:flex-row flex-col-reverse justify-between md:gap-[630px] gap-4'>
    <div>
      <h2 className='text-black font-extrabold text-3xl md:text-4xl'>{greetUser() + ' ' + 'Tioluwanimi'}</h2>
      <p className='text-[#4b4b4b] text-base md:text-lg mt-2'>Welcome to where you&apos;re fully in charge, start monitoring progress now!</p>
    </div>

    <div className='bg-[#808080] rounded-full w-[75px] h-[75px] md:w-[85px] md:h-[85px] flex items-center justify-center'>
      <img className='w-[65px] md:w-[75px] rounded-full' src={images.defaultProfile} alt="Profile" />
    </div>
  </div>

  <div className='flex items-center gap-3 mt-6 md:mt-8'>
    <img className='w-[35px] md:w-[40px]' src={images.calendar} alt="Calendar" />
    <p className='text-sm text-black md:text-base'>{getDate()}</p>
  </div>

  {/* Performance section */}
  <div className='pt-8 md:pt-10'>
    <p className='font-semibold text-lg md:text-xl text-black mb-4'>Performance</p>

    <div className='flex flex-col md:flex-row gap-6 justify-center md:justify-start text-center md:text-left'>

      {/* Users Box */}
      <div className='flex flex-col justify-center items-center w-full max-w-[320px] bg-slate-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mb-4'>
          <User color='#fff'/>
        </div>
        <p className='text-xl text-black font-semibold'>Users</p>
        <p className='text-sm text-gray-500'>{userList.length}</p>
      </div>

      {/* Uploads Box */}
      <div className='flex flex-col justify-center items-center w-full max-w-[320px] bg-slate-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mb-4'>
          <UploadCloudIcon color='#fff'/>
        </div>
        <p className='text-xl text-black font-semibold'>Uploads</p>
        <p className='text-sm text-gray-500'>{uploadList.length}</p>
      </div>

      {/* Deals Box */}
      <div className='flex flex-col justify-center items-center w-full max-w-[320px] bg-slate-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mb-4'>
          <ThumbsUp color='#fff'/>
        </div>
        <p className='text-xl text-black font-semibold'>Deals</p>
        <p className='text-sm text-gray-500'>0</p>
      </div>
      
    </div>
  </div>
</div>



    </div>
    
  )
}

export default Admin
