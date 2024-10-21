import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { addDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/Firebase'

const Upload = () => {

  const itemsCollectionRef = collection(db, 'shopItems')

  const [itemName, setItemName] =  useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [itemDesc, setItemDesc] = useState('')
  const [uploadList, setUploadItems] = useState([])
  // const [itemPicture, setItemPicture] = useState()

  const upload = async () =>{

    try {
      await addDoc(itemsCollectionRef,{
        name: itemName,
        price: itemPrice,
      })
    } catch (error) {
      console.error(error)
    }

  }

  const getUploadList = async () =>{
    try {
      const data = await getDocs(itemsCollectionRef)
      const filteredData = await data.docs.map((items) => (
        {
          ...items.data(),
          id: items.id
        }
      ))
      setUploadItems(filteredData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getUploadList()
  },[])

  console.log(uploadList)

  return (
    <div>
    <SideBar />
      <div>
        <input type="text" placeholder='Enter the product name' onChange={e=>setItemName(e.target.value)}/>
        <input type="text" placeholder='Enter product description' onChange={e=>setItemDesc(e.target.value)}/>
        <input type="number" placeholder='Enter product price' onChange={e=>setItemPrice(e.target.value)} />
      </div>
    </div>
  )
}

export default Upload
