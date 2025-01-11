import React, { useContext, useState } from 'react';
import { images } from '../assets/asset';
import { auth, googleprovider, db } from '../config/Firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { InfinitySpin } from 'react-loader-spinner';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Appcontext';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { authSuccess, setAuthSuccess } = useContext(GlobalContext);

const storeUserData = async (user) => {
  const userData = {
    userId: user.uid, // Include the UID in the document
    email: user.email,
    role: 'user',
  };

  try {
    await setDoc(doc(db, "users", user.uid), userData);
    console.log('User data stored in Firestore:', userData);
  } catch (error) {
    console.error('Error storing user data:', error.message);
  }
};


  const signUp = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await storeUserData(user);
      setAuthSuccess(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setAuthSuccess(false);
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleprovider);
      const user = userCredential.user;
      await storeUserData(user);
      setAuthSuccess(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert("An error occurred, let's try that again");
      setAuthSuccess(false);
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  return (
    <div className='flex items-center justify-center bg-custom-image2 h-screen'>
      <div className='flex gap-36 items-center bg-white rounded-xl px-20 py-12'>
        <div className='w-[600px]'>
          <img className='rounded-xl' src={images.authpageImg2} alt="" />
        </div>
        <div className='flex flex-col gap-[15px]'>
          <div className='flex flex-col'>
            <label htmlFor="username" className='flex items-center gap-1'>email</label>
            <input
              name='username'
              type="email"
              placeholder='Enter your username'
              className='border-[0.1px] rounded-md w-[400px] py-3 px-3'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password" className='flex items-center gap-1'>Password</label>
            <input
              name='password'
              type="password"
              placeholder='Enter your password'
              className='border-[0.1px] rounded-md w-[400px] py-3 px-3'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={signUp}
            className={isLoading ? 'flex items-center justify-center bg-[#000000] -py-1 rounded-md' : 'bg-[#000000] w-[400px] text-[#ffffff] py-[17px]'}
          >
            {isLoading ? <InfinitySpin visible={true} width="120" color="#ffffff" /> : 'Join'}
          </button>
          <button
            onClick={signInWithGoogle}
            className='flex gap-2 items-center border-[1px] border-black rounded-md w-[400px] text-[#000000] py-2'
          >
            <img className='w-[30px]' src={images.google_icon} alt="" />
            <span>Sign In With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
