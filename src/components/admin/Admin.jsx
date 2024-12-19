import React, { useContext } from 'react'
import SideBar from './SideBar'
import { images } from '../../assets/asset'

import { LineChart, ThumbsUp, User } from 'lucide-react'
import { GlobalContext } from '../../context/Appcontext'

const Admin = () => {

  const {userList} = useContext(GlobalContext)

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

        {/* main page */}
        <div className='pt-10'>
          <p className='font-semibold '>Performance</p>

            <div className='border-t border-b flex justify-center text-center'>
              <div className='flex gap-4 justify-center text-center items-center border-r h-[90px] w-[300px]'>
                <div className='bg-lime-500 rounded-full w-12 h-12 flex items-center justify-center'><User color='#fff'/></div>
                <div>
                  <p className='text-lg'>Users</p>
                  <p className='text-xs text-gray-400'>{userList.length}</p>
                </div>
              </div>
              <div className='flex gap-4 justify-center text-center items-center border h-[90px] w-[300px]'>
                <div className='bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center'><ThumbsUp color='#fff'/></div>
                <div>
                  <p className='text-lg'>Users</p>
                  <p className='text-xs text-gray-400'>7</p>
                </div>
                
              </div>
              <div className='flex gap-4 justify-center text-center items-center border-l h-[90px] w-[300px]'>
              <div className='bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center'><User color='#fff'/></div>
              <div>
                  <p className='text-lg'>Users</p>
                  <p className='text-xs text-gray-400'>7</p>
                </div>
              </div>
            </div>
        </div>
      </div>


    </div>
    
  )
}

export default Admin
