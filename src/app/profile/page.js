"use client"
import React, { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaEdit, FaCamera, FaSave, FaTimes, FaWallet, FaDesktop } from 'react-icons/fa';

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
        <div className="min-h-screen rounded-lg  border-2 border-[#d3d4d4] overflow-hiddens mt-4 ">

            <div className=" h-[40vh] overflow-hidden  flex justify-center space-x-16   border-b-2 border-gray-300 py-4">
                {/* img of the laptop which user has kept in their active device */}

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
            {/* Main Content */}
            <div className="grid md:grid-cols-3 gap-6 mx-8 my-4">
                {/* User Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 ">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">User Information</h2>

                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-600 mb-1">Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                disabled={!editChanges}
                                className={`w-full rounded-lg ${editChanges
                                    ? 'border-2 border-gray-200 focus:border-blue-500 bg-white'
                                    : 'border-transparent bg-gray-50'
                                    } px-3 py-2 focus:outline-none transition-colors`}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-600 mb-1">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={!editChanges}
                                className={`w-full rounded-lg ${editChanges
                                    ? 'border-2 border-gray-200 focus:border-blue-500 bg-white'
                                    : 'border-transparent bg-gray-50'
                                    } px-3 py-2 focus:outline-none transition-colors`}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-600 mb-1">Mode:</label>
                            {editChanges ? (
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="landlord"
                                            checked={isLandlord}
                                            onChange={handleModeChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Landlord</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="tenant"
                                            checked={!isLandlord}
                                            onChange={handleModeChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Tenant</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                                    {isLandlord ? 'Landlord' : 'Tenant'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Devices Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 ">
                    <div className="flex items-center gap-2 mb-6">
                        <FaDesktop className="text-gray-00" />
                        <h2 className="text-xl font-semibold">My Devices</h2>
                    </div>
                    <div className="space-y-4">
                        {devices.map((device, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg p-4 hover:bg-gray-100 transition-colors text-lg">
                                <h3 className="font-medium text-gray-900">{device.name}</h3>
                                <p className="text-lg text-gray-600 mt-1">{device.specs}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Balance Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 ">
                    <div className="flex items-center gap-2 mb-6 justify-center md:justify-start ">
                        <FaWallet className="text-gray-600" />
                        <h2 className="text-xl font-semibold">Finance</h2>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-600 text-lg mt-2">Current Balance:</p>

                        <div className="text-3xl mt:2 font-bold text-gray-900">Rs. {balance}</div>
                        <div className="flex justify-around md:justify-start gap-8 mt-4">
                            {/* Implement payment Integration over here */}
                        <button
                            onClick={() => alert('Load clicked')}
                            className="bg-green-600 text-white text-xl px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center">
                            Load
                        </button>
                        <button
                            onClick={() => alert('Withdraw clicked')}
                            className="bg-red-600 text-white text-xl px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center">
                            Withdraw
                        </button>
                        </div>
                    </div>
                  
                       

                   
                </div>
            </div>


            {/* Edit eligible part ends here */}

            {!editChanges ? (
                < div className="flex justify-center mt-10">
                    <button
                        onClick={handleEditChanges}
                        className="bg-blue-600 text-white  text-xl px-4 py-4 rounded-lg focus:outline-none flex items-center justify-center ">
                        <FaEdit className='mx-2' />
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div className='flex justify-around mt-10'>
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

    );
};

export default Profile;