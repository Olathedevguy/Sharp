import React from 'react'
import { images } from '../../assets/asset'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='flex flex-col items-center gap-[180px] h-screen bg-white border  border-r-gray-500 border-l-0 border-b-0 w-[200px]'>
      <div className='mt-16'>
        <img className='w-[80px]' src={images.nike_icon} alt="" />
      </div>

      <div className='flex flex-col gap-6'>
        <Link to='/admin' 
        className={window.location.pathname=='/admin' ? `flex gap-1 bg-black text-white rounded-md px-2 py-2 w-40` : 'flex gap-1 text-black rounded-md px-2 py-2 w-40'}>
        {window.location.pathname=='/admin' ? <img src={images.admin_home_icon_active} alt="" /> : <img src={images.admin_home_icon}/>}
        <p>Home</p>
        </Link>
        <Link to='/admin/users' 
        className={window.location.pathname=='/admin/users' ? `flex gap-1 bg-black text-white rounded-md px-2 py-2 w-40` : 'flex gap-1 text-black rounded-md px-2 py-2 w-40'}>
            {window.location.pathname=='/admin/users' ? <img src={images.admin_users_icon_active} alt="" /> : <img src={images.admin_users_icon}/>}
        <p>Users</p>
        </Link>
        <Link to="/admin/upload" 
        className={window.location.pathname=='/admin/upload' ? `flex gap-1 bg-black text-white rounded-md px-2 py-2 w-40` : 'flex gap-1 text-black rounded-md px-2 py-2 w-40'}>
            {window.location.pathname=='/admin/upload' ? <img src={images.admin_upload_icon_active} alt="" /> : <img src={images.admin_upload_icon}/>}
        <p>Upload</p>
        </Link>
        <Link to="/admin/settings" 
        className={window.location.pathname=='/admin/settings' ? `flex gap-1 bg-black text-white rounded-md px-2 py-2 w-40` : 'flex gap-1 text-black rounded-md px-2 py-2 w-40'}>
            {window.location.pathname=='/admin/settings' ? <img src={images.admin_setting_icon_active} alt="" /> : <img src={images.admin_setting_icon}/>}
        <p>Settings</p>
        </Link>
      </div>

      <div className='flex flex-col gap-4 mb-9'>
        <Link className='flex gap-2'><img className='w-[26px]' src={images.admin_info_icon} alt="" /><p>Help & info</p></Link>
        <Link className='flex gap-2'><img className='w-[26px]' src={images.admin_logout_icon} alt="" /><p>Logout</p></Link>
      </div>
    </div>
  )
}

export default SideBar
