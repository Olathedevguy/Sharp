import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { addDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db, storage } from '../../config/Firebase'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

const Upload = () => {

  const itemsCollectionRef = collection(db, 'shopItems')
  const [isLoading, setIsLoading] = useState(false)

  const [itemName, setItemName] =  useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [itemDesc, setItemDesc] = useState('')
  const [uploadList, setUploadItems] = useState([])
  const [imgUpload, setImgUpload] = useState()
  const [imgList, setImgList] = useState([])
  const imgListRef = ref(storage, "ItemImages/")
  // const [itemPicture, setItemPicture] = useState()

  const upload = async () =>{

    try {
      await addDoc(itemsCollectionRef,{
        name: itemName,
  price: itemPrice,
  description: itemDesc,
  imageUrl: imgList[0]
      })
    } catch (error) {
      console.error(error)
    }

  }

  const getUploadList = async () =>{
    try {
      const data = await getDocs(itemsCollectionRef)
      const filteredData = data.docs.map((items) => (
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

  const imageUpload = async () =>{
    if (imgUpload == null) return;
    const imageRef = ref(storage, `ItemImages/${imgUpload.name + v4()}`)
    uploadBytes(imageRef, imgUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setImgList((prev)=>[...prev, url])
      })
    })
  }

  const uploadAll = () =>{
    imageUpload()
    upload()
  }

  useEffect(()=>{
    getUploadList()

    listAll(imgListRef).then((response) =>{
      const promises = response.items.map((item)=>{
        return getDownloadURL(item).then((url)=>url)
      })

      Promise.all(promises).then((urls) =>{
        setImgList(urls)
      })
    })
  },[])

  console.log(uploadList)

  return (
    <div className='flex gap-9'>
    <SideBar />
      <div className='flex flex-col justify-center gap-4'>
        <input className='border border-black' type="file" onChange={e=>setImgUpload(e.target.files[0])}/>
        <input className='border border-black text-center' type="text" placeholder='Enter the product name' onChange={e=>setItemName(e.target.value)}/>
        <input className='border border-black text-center' type="text" placeholder='Enter product description' onChange={e=>setItemDesc(e.target.value)}/>
        <input className='border border-black text-center' type="number" placeholder='Enter product price' onChange={e=>setItemPrice(Number(e.target.value))} />
        <button className='border border-black bg-black text-white items-center text-center px-8 py-2' onClick={upload}>Upload</button>
      </div>
    </div>
  )
}

export default Upload
