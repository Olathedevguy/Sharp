import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { db } from '../../config/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import { InfinitySpin } from 'react-loader-spinner'

const Users = () => {

  const [loadingState, setLoadingState] = useState(false)
  const [userList, setUserList] = useState([])
  const userCollectionRef = collection(db, "users")

  const getUserList = async () =>{
    setLoadingState(true)
    try {
      const data =  await getDocs(userCollectionRef)
      const filteredData =  data.docs.map((user)=>(
        {
          ...user.data(),
          id: user.id
        }
      ))
      setUserList(filteredData)
    } catch (error) {
      console.error(error)
    }
    setLoadingState(false)
  }

  useEffect(()=>{
    getUserList()
  },[])
  console.log(userList)

  return (

    <div className='flex'>
  <SideBar />
  <div>
     { 
    
    loadingState ? <div className='flex items-center'><InfinitySpin
    visible={true}
    width="120"
    color="#000000"
    ariaLabel="infinity-spin-loading"/>
    <p>fetching user data</p>
    </div> :
      <div className='flex justify-center mt-20 ml-[30px] items-center'>
    <div className='flex flex-col'>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className='border-b-2 border-gray-600'>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">User ID</th>
          </tr>
        </thead>
        <tbody>
          {   
    loadingState ? <InfinitySpin
    visible={true}
    width="120"
    color="#ffffff"
    ariaLabel="infinity-spin-loading"
/> :
            userList.map((user) => (
              <tr className='border-b' key={user.id}>
                <td className="px-4 py-2 bg-black text-white">{user.email}</td>
                <td className="px-4 py-2 bg-gray-500">{user.uid}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  }
  </div>
 

</div>

  )
}

export default Users
