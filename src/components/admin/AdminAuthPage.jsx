import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Rings } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ label, type, value, onChange, onKeyDown, placeholder }) => (
    <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">{label}</label>
        <input
            className="border rounded-md border-indigo-300 w-full sm:w-[400px] py-3 px-4 outline-none bg-indigo-50 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
        />
    </div>
);

const AdminAuthPage = ({ isAdminLoginSuccessful, handleAdminSuccess }) => {
    const [showPwd, setShowPwd] = useState(false);
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
                    toast.error('Access denied. You are not an admin.');
                }
            } else {
                setError('Access denied. User data not found.');
                toast.error('Access denied. User data not found');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') loginAsAdmin();
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-custom-image3">
            <div className="flex flex-col justify-center gap-6 bg-white w-full sm:w-[450px] p-8 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-90">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter admin email"
                />
                <div className="relative">
                    <InputField
                        label="Password"
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter admin password"
                    />
                    <button
                        onClick={() => setShowPwd(!showPwd)}
                        className="text-indigo-500 hover:text-indigo-600 absolute top-10 right-4"
                    >
                        {showPwd ? <Eye /> : <EyeOff />}
                    </button>
                </div>
                <button
                    className={`${
                        isLoading ? 'bg-indigo-400' : 'bg-indigo-600'
                    } text-white py-2 rounded-md w-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-indigo-700`}
                    onClick={loginAsAdmin}
                >
                    {isLoading ? (
                        <Rings color="white" width={20} />
                    ) : (
                        'Login'
                    )}
                </button>
                {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default AdminAuthPage;
