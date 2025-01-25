import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { InfinitySpin, Rings } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ label, type, value, onChange, onKeyDown, placeholder }) => (
    <div className="flex flex-col">
        <label className="mb-1">{label}</label>
        <input
            className="border rounded-md border-gray-400 w-[400px] py-3 px-3 outline-none bg-gray-200"
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
        />
    </div>
);



const AdminAuthPage = ({ isAdminLoginSuccessful, handleAdminSuccess }) => {
    const [showPwd, setShowPwd] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const loginAsAdmin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role === 'admin') {
                    handleAdminSuccess();
                    setEmail('');
                    setPassword('');
                } else {
                    setError('Access denied. You are not an admin.');
                    toast.error("Access denied. You are not an admin.")
                }
            } else {
                setError('Access denied. User data not found.');
                toast.error("Access denied. User data not found")
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            toast.error("An error occurred. Please try again later.")
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') loginAsAdmin();
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-custom-image3">
            <ToastContainer position='top-center' hideProgressBar/>
            <div className="flex flex-col justify-center gap-6 bg-white w-[500px] h-[400px] items-center mt-28 shadow-lg rounded-lg backdrop-blur-lg bg-opacity-20 shadow-slate-600 p-6">
                <h2 className="text-xl font-semibold">Admin Login</h2>
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter admin email"
                />
                <div className='relative'><InputField
                    label="Password"
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter admin password"
                />
                <button onClick={()=>setShowPwd(!showPwd)} className='text-blue-300 hover:text-blue-400 absolute top-10 left-[22.5rem]'>{showPwd?<Eye/>:<EyeOff/>}</button>
                </div>
                <button
                    className={`${isLoading ? "bg-transparent":"bg-black"} text-white py-2 rounded-md w-full flex justify-center items-center`}
                    onClick={loginAsAdmin}
                >
                    {isLoading ? (
                            <Rings color='white' width={50}/>
                    ) : (
                        'Login'
                    )}
                </button>
                {error && <p className="text-red-600">{error}</p>}
            </div>
        </div>
    );
};

export default AdminAuthPage;
