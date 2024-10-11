import React, { useState } from 'react'
import { images } from '../assets/asset'
// import { User } from 'lucide-react'
import { auth, googleprovider, db } from '../config/Firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { InfinitySpin } from 'react-loader-spinner';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] =  useState(false)

    const storeUserData = async (user) =>{

        const userData = {
            uid: user.uid,
            email: user.email,
        }

        await setDoc(doc(db, "users", user.uid), userData)
        console.log('User data stored in Firestore:', userData);

    }

    const signIn = async () =>{

        setIsLoading(true)
        try {
             const userCredential = await createUserWithEmailAndPassword(auth, email, password)
             const user = userCredential.user
             await storeUserData(user)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
            setEmail('')
            setPassword('')
        }
    }

    const signInWithGoogle = async () =>{
        setIsLoading(true)
        try {
            const userCredential = await signInWithPopup(auth, googleprovider)
            const user = userCredential.user
            await storeUserData(user)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='flex  items-center justify-center mt-10'>
      <div className='flex gap-36 items-center bg-white rounded-xl px-20 py-14 '>
        <div className=' w-[600px] '><img className='rounded-xl' src={images.authpageImg2} alt="" /></div>
        <div className='flex flex-col gap-[15px]'>
            <div className='flex flex-col'>
             <label htmlFor="username" className='flex items-center gap-1'>email <img className='w-[20px]' src={images.auth_user_icon} alt="" /></label>
            <input name='username' type="email" placeholder='Enter your username' className='border-[0.1px] rounded-md border-[#808080] w-[400px] py-3 
            px-3'
            onChange={e=>setEmail(e.target.value)} 
            />    
            </div>
           
            <div className='flex flex-col'>
            <label htmlFor="password" className='flex items-center gap-1'>Password <img className='w-[20px]' src={images.lock_icon} alt="" /></label>
            <input name='password' type="password" placeholder='Enter you password' className='border-[0.1px] rounded-md border-[#808080] w-[400px] py-3 px-3'
            onChange={e=>setPassword(e.target.value)}
            />
            </div>
            <button onClick={signIn} className={ isLoading ? 'flex items-center justify-center bg-[#000000] -py-1 rounded-md' :'flex items-center justify-center border-[0.1px] rounded-md bg-[#000000] w-[400px] text-[#ffffff] py-[17px]'}>{isLoading ? 

        <InfinitySpin
        visible={true}
        width="120"
        color="#ffffff"
        ariaLabel="infinity-spin-loading"
            />
            :
            'Join'
            }</button>
            <button
            onClick={signInWithGoogle}
             className='flex gap-2 items-center justify-center border-[1px] border-black rounded-md bg-transparent w-[400px] text-[#000000] py-2'> 
                
            <img className='w-[30px]' src={images.google_icon} alt="" /> <span>Sign In With Google</span></button>

        </div>
      </div>
    </div>
  )
}

export default Auth
