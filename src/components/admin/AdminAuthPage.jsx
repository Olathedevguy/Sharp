import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { InfinitySpin } from 'react-loader-spinner';

const AdminAuthPage = ({ isAdminLoginSuccessful, handleAdminSuccess }) => {
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
                    console.log('Access granted');
                    handleAdminSuccess();
                    setEmail('');
                    setPassword('');
                } else {
                    console.log('Access denied - not an admin');
                    setError('Access denied. You are not an admin.');
                }
            } else {
                console.log('User document not found');
                setError('Access denied. User data not found.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginAsAdmin(); // Call the login function on Enter key press
        }
    };

    return (
        <div className="flex items-center bg-custom-image3 justify-center h-screen w-screen">
            <div className="flex flex-col justify-center gap-10 bg-white w-[500px] h-[400px] items-center mt-28 shadow-lg rounded-lg backdrop-blur-lg bg-opacity-20 shadow-slate-600">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <label htmlFor="">Admin</label>
                        <input
                            className="border-[0.1px] rounded-md border-[#808080] w-[400px] py-3 px-3 outline-none bg-gray-200"
                            placeholder="enter admin email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="">Password</label>
                        <input
                            className="border-[0.1px] rounded-md border-[#808080] w-[400px] py-3 px-3 outline-none bg-gray-200"
                            type="password"
                            placeholder="enter admin password"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                </div>

                <button
                    className={
                        isLoading
                            ? 'flex items-center justify-center bg-[#000000] -py-1 rounded-md outline-none'
                            : 'flex items-center justify-center rounded-md bg-[#000000] w-[400px] text-[#ffffff] py-[17px] outline-none'
                    }
                    onClick={loginAsAdmin} // Call the login function on click
                >
                    {isLoading ? (
                        <InfinitySpin
                            visible={true}
                            width="120"
                            color="#ffffff"
                            ariaLabel="infinity-spin-loading"
                        />
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
