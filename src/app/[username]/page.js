"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [devices, setDevices] = useState([
        { name: 'Device 1', specs: 'CPU: 4 cores, RAM: 16GB, GPU: NVIDIA GTX 1080' },
        { name: 'Device 2', specs: 'CPU: 8 cores, RAM: 32GB, GPU: NVIDIA RTX 3080' }
    ]);
    const [deviceImage, setDeviceImage] = useState('');
    const [balance, setBalance] = useState(100); // Static balance
    const [editChanges, setEditChanges] = useState(false);
    useEffect(() => {
        if (status === 'loading') {
            return; // Do nothing while loading
        }
        if (!session) {
            router.push('/login'); // Redirect to login if not authenticated
        }
       
    }, [session, status, router]);

    useEffect(() => {
        if (session) {
            setUsername(session?.user?.name || '');
            setEmail(session?.user?.email || '');
            setProfilePic(session.user.image || '');
            
           
        }
        console.log("url : ",session?.user?.image)
    }, [session]);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSaveChanges = () => {
        // Save the updated username, email, password, and profile picture to the server
        console.log('Changes saved:', { username, email, password, profilePic });
    };
    const handleEditChanges = () => {
        setEditChanges(!editChanges);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen border-2 border-red-200 py-2">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden ">
              
                <div className=" h-[40vh] overflow-hidden bg-slate-400 flex justify-center">
                 {/* img of the laptop which user has kept in their active device */}
                    <img src="https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF1000,1000_QL80_.jpg" alt="" />
                </div>
                {/* profile pic parts start here */}
                 <div className="relative -mt-16 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gray-400 p-0.5 flex items-center justify-center">
                        <label htmlFor="profile-pic-upload" className="w-full h-full cursor-pointer flex items-center justify-center ">
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="w-full h-full text-gray-400" />
                            )}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="profile-pic-upload"
                            onChange={handleProfilePicChange}
                            className="hidden"
                        />
                    </div>
                </div>
                {/* profile pic parts end here */}
                <h2 className="text-xl my-0.5 text-center font-semibold text-gray-800">{username}</h2>
                <div className="text-center px-6 py-4 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
                    
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="text-2xl font-semibold text-gray-800 text-center bg-white border-2 rounded-lg border-gray-200  focus:outline-none"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="text-lg text-gray-800 text-center bg-transparent border-none focus:outline-none mt-2"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="text-lg text-gray-800 text-center bg-transparent border-none focus:outline-none mt-2"
                        placeholder="Password"
                    />
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">My Devices</h2>
                    <ul className="mt-2 space-y-2">
                        {devices.map((device, index) => (
                            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
                                <p className="text-gray-600">{device.specs}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">Balance</h2>
                    <p className="text-gray-600">${balance}</p>
                </div>
                <div className="px-6 py-4 flex justify-around">
                  
                    <button
                        onClick={handleEditChanges}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Edit Changes
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;