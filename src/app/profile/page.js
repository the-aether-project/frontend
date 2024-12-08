"use client"
import React, { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaEdit, FaCamera, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmpassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [devices, setDevices] = useState([
        { name: 'Device 1', specs: 'CPU: 4 cores, RAM: 16GB, GPU: NVIDIA GTX 1080' },
        { name: 'Device 2', specs: 'CPU: 8 cores, RAM: 32GB, GPU: NVIDIA RTX 3080' }
    ]);
    const [deviceImage, setDeviceImage] = useState('');
    const [balance, setBalance] = useState(100); // Static balance
    const [editChanges, setEditChanges] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLandlord, setIsLandlord] = useState(true);

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
            setProfilePic(session?.user?.image || '');


        }
        console.log("url : ", session?.user?.image)
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
        console.log('Changes saved:', { username, email, profilePic });
        setEditChanges(false)
    };
    const handleEditChanges = () => {
        setEditChanges(!editChanges);
    };
    const handleModeChange = (e) => {
        setIsLandlord(e.target.value === 'landlord');
    };
    const handleCancelChanges = () => {
        setEditChanges(false);
        setUsername(session?.user?.name || '');
        setEmail(session?.user?.email || '');
        // setPassword('');
        // setConfirmPassword('');
        setProfilePic(session?.user?.image || '');
        setErrors({});
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen rounded-lg  border-2 border-[#d3d4d4] ">
            <div className="w-full bg-white shadow-lg overflow-hidden ">

                <div className=" h-[40vh] overflow-hidden  flex justify-center space-x-16   border-b-2 border-gray-300 py-4">
                    {/* img of the laptop which user has kept in their active device */}
                    
                        <img src="https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF1000,1000_QL80_.jpg" alt="" />
                    
                        <img src="https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF1000,1000_QL80_.jpg" alt="" />
                    
                        <img src="https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF1000,1000_QL80_.jpg" alt="" />
                        
                   
                </div>
                { /* profile pic parts start here */}
                <div className="relative -mt-16 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gray-400 p-0.5 flex items-center justify-center">
                        <label htmlFor="profile-pic-upload" className={`w-full h-full cursor-pointer flex items-center justify-center overflow-hidden ${editChanges ? '' : 'pointer-events-none'}`}>
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="w-full h-full text-gray-400" />
                            )}
                            {editChanges && (
                                <div className="absolute bottom-0 text-2xl bg-blue-600 rounded-full p-2 shadow-lg flex ">
                                    <FaCamera className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="profile-pic-upload"
                            onChange={handleProfilePicChange}
                            className="hidden"
                            disabled={!editChanges}
                        />
                    </div>
                </div>
                 {/* profile pic parts end here */}
                                <h2 className="text-xl my-0.5 text-center font-semibold text-gray-800">{session?.user?.name || ''}</h2>

                                <div className="px-6 py-4 flex flex-col -mt-4">
                                    <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
                                    <div className='flex gap-4 mt-2 mx-6 items-center'>
                                        <label className="text-lg text-gray-800 mt-2">Username:</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            className={`text-lg text-gray-800  bg-white rounded-lg mt-2
                                                         ${editChanges
                                                    ? 'border-2 border-gray-200 px-2 focus:outline-none focus:border-blue-500'
                                                    : 'border-none bg-transparent'}`}
                                            placeholder="Username"
                                            disabled={!editChanges}
                                        />
                                    </div>
                                    <div className='flex gap-4 mt-2 mx-6 items-center'>
                                        <label className="text-lg text-gray-800 mt-2">Email:</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className={`text-lg text-gray-800 text-center mt-2 rounded-lg
                                               ${editChanges
                                                    ? 'border-2 border-gray-200 focus:outline-none focus:border-blue-500'
                                                    : 'border-none bg-transparent'}`}
                                            placeholder="Email"
                                            disabled={!editChanges}
                                          
                                        />
                                    </div>
                                    <div className='flex gap-4 mt-2 mx-6'>
                                        <label className="text-lg text-gray-800 mt-2">Mode:</label>
                                        {editChanges ? (
                                            <div className="flex items-center mt-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        value="landlord"
                                                        checked={isLandlord}
                                                        onChange={handleModeChange}
                                                        className="mr-2"
                                                    />
                                                    Landlord
                                                </label>
                                                <label className="flex items-center ml-4">
                                                    <input
                                                        type="radio"
                                                        value="tenant"
                                                        checked={!isLandlord}
                                                        onChange={handleModeChange}
                                                        className="mr-2"
                                                    />
                                                    Tenant
                                                </label>
                                            </div>
                                        ) : (
                                            <span className="text-lg text-gray-800 mt-2">{isLandlord ? 'Landlord' : 'Tenant'}</span>
                                        )}
                                    </div>
                                    {/*Here put Change Password Component.*/}

                   


                </div>

                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">Device Info</h2>
                    <ul className="mt-2 space-y-2 ">
                        {devices.map((device, index) => (
                            <li key={index} className="  border-gray-100 py-4 px-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
                                <p className="text-gray-600 py-2">{device.specs}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">Transactions:</h2>
                    <div className='mt-2 space-y-2 px-6 flex flex-col'>
                    <div className='flex items-center'>
                        <h3 className="text-lg text-gray-800">Balance:</h3>
                        <p className="text-gray-600 mx-2 text-lg">Rs. {balance}</p>
                    </div>

                    </div>
                </div>
                {/* Edit eligible part ends here */}

                {!editChanges ? (
                    < div className="flex justify-center mb-6">
                        <button
                            onClick={handleEditChanges}
                            className="bg-blue-600 text-white  text-xl px-4 py-4 rounded-lg focus:outline-none flex items-center justify-center ">
                            <FaEdit className='mx-2' />
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <div className='flex justify-around mb-4'>
                        <button
                            onClick={handleSaveChanges}
                            className="bg-blue-600 text-white  text-xl px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center">
                            <FaSave className='mx-2' />
                            Save Changes
                        </button>

                        <button
                            onClick={handleCancelChanges}
                            className="bg-blue-600 text-white text-xl px-4 py-4 rounded-lg focus:outline-none flex items-center justify-center ">
                            <FaTimes className='mx-2' />
                            Cancel
                        </button>
                    </div>
                )
                }


            </div>
        </div>
    );
};

export default Profile;