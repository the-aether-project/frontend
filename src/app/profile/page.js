"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from '@/app/ui/components/SessionProvider';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaEdit, FaCamera, FaSave, FaTimes, FaWallet, FaDesktop } from 'react-icons/fa';
import { checkSession } from '../ui/components/auth/checkSession';
const Profile = () => {
    const {session, status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [devices, setDevices] = useState([
        { name: 'Device 1', specs: 'CPU: 4 cores, RAM: 16GB, GPU: NVIDIA GTX 1080' },
        { name: 'Device 2', specs: 'CPU: 8 cores, RAM: 32GB, GPU: NVIDIA RTX 3080' }
    ]);
    const [deviceImage, setDeviceImage] = useState('');
    const [balance, setBalance] = useState(100); // yeslai dynamic banauna nabirsinu
    const [editChanges, setEditChanges] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLandlord, setIsLandlord] = useState(true);
    const [tempIsLandlord, setTempIsLandlord] = useState(true);

    checkSession();

    useEffect(() => {
        if (session) {
            setUsername(session?.username || '');
            setEmail(session?.email || 'test@gmail.com');
            setProfilePic(session?.user?.image || '');
            setTempIsLandlord(isLandlord);
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

    

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSaveChanges = () => {
       
        console.log('Changes saved:', { username, email, profilePic });
        setEditChanges(false)
        setIsLandlord(tempIsLandlord);
    };

    const handleEditChanges = () => {
        setEditChanges(!editChanges);
    };

    const handleModeChange = (e) => {
        setTempIsLandlord(e.target.value === 'landlord');
    };

    const handleCancelChanges = () => {
        setEditChanges(false);
        // setUsername(session?.username || '');
        // setEmail(session?.user?.email || '');
        // setProfilePic(session?.user?.image || '');
        // setTempIsLandlord(isLandlord);
        setErrors({});
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className=" px-5 min-h-screen bg-background text-foreground rounded-lg  border-muted overflow-hidden mt-4">
            <div className="h-[40vh] overflow-hidden flex justify-center space-x-16 border-b-2 border-muted py-4 bg-muted">
                <img src="https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF1000,1000_QL80_.jpg" alt="" />
            </div>
            {/* Profile pic parts start here */}
            <div className="relative -mt-16 flex justify-center profile-pic">
                <div className="w-32 h-32 rounded-full bg-muted p-0.5 flex items-center text-center justify-center">
                    <label htmlFor="profile-pic-upload" className={`w-full h-full cursor-pointer flex items-center justify-center overflow-hidden ${editChanges ? '' : 'pointer-events-none'}`}>
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="User Avatar"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <FaUserCircle className="w-full h-full text-muted-foreground" />
                        )}
                        {editChanges && (
                            <div className="absolute bottom-0 text-2xl bg-blue-600 rounded-full p-2 shadow-lg flex">
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
            {/* Profile pic parts end here */}
            <h2 className="text-xl my-0.5 text-center  font-semibold">{session?.username || ''}</h2>
            {/* Main Content */}
            <div className="grid md:grid-cols-3 gap-6 mx-8 my-4">
                <div className=" rounded-xl shadow-lg p-6 border-2 border-muted">
                    <div className="flex items-center mb-6 gap-2">
                        <FaUserCircle className="text-muted-foreground text-xl" />
                        <h2 className="text-xl font-semibold">User Information</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-muted-foreground mb-1">Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                disabled={!editChanges}
                                className={`w-full rounded-lg ${editChanges
                                    ? 'border-2 border-muted focus:border-blue-500 bg-background'
                                    : 'border-transparent bg-muted'
                                    } px-3 py-2 focus:outline-none transition-colors`}
                            />
                        </div>
                        <div>
    <label className="block text-lg font-medium text-muted-foreground mb-1">Email:</label>
    <p className="w-full rounded-lg border-transparent bg-muted px-3 py-2">{email}</p>
</div>
                        <div>
                            <label className="block text-lg font-medium text-muted-foreground mb-1">Mode:</label>
                            {editChanges ? (
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="landlord"
                                            checked={tempIsLandlord}
                                            onChange={handleModeChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Landlord</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="tenant"
                                            checked={!tempIsLandlord}
                                            onChange={handleModeChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Tenant</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="bg-muted px-3 py-2 rounded-lg">
                                    {isLandlord ? 'Landlord' : 'Tenant'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-background rounded-xl bg-back shadow-lg p-6 border-2 border-muted">
                    <div className="flex items-center gap-2 mb-6">
                        <FaDesktop className="text-muted-foreground" />
                        <h2 className="text-xl font-semibold">My Devices</h2>
                    </div>
                    <div className="space-y-4">
                        {!isLandlord && (
                            <div className="bg-muted border-4 border-green-300 rounded-lg p-4 hover:bg-muted transition-colors text-lg">
                                <h3 className="font-medium text-foreground">Rented Device</h3>
                                <p className="text-lg text-muted-foreground mt-1">CPU: 6 cores, RAM: 24GB, GPU: NVIDIA RTX 2060</p>
                            </div>
                        )}
                        {devices.map((device, index) => (
                            <div key={index} className="bg-muted rounded-lg p-4 hover:bg-muted transition-colors text-lg">
                                <h3 className="font-medium text-foreground">{device.name}</h3>
                                <p className="text-lg text-muted-foreground mt-1">{device.specs}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-background text-foreground rounded-xl shadow-lg p-6 border-2 border-muted">
                    <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                        <FaWallet className="text-muted-foreground" />
                        <h2 className="text-xl font-semibold">Finance</h2>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-muted-foreground text-lg mt-2">Current Balance:</p>
                        <div className="text-3xl mt:2 font-bold text-foreground">Rs. {balance}</div>
                        <div className="flex  flex-col justify-start lg:flex-row gap-8 mt-4">
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
            {!editChanges ? (
                <div className="flex justify-center mt-10 mb-4">
                    <button
                        onClick={handleEditChanges}
                        className="bg-blue-600 text-white text-xl px-4 py-4 rounded-lg focus:outline-none flex items-center justify-center">
                        <FaEdit className='mx-2' />
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div className='flex justify-around mt-10'>
                    <button
                        onClick={handleSaveChanges}
                        className="bg-blue-600 text-white text-xl px-4 py-2 rounded-lg focus:outline-none flex items-center justify-center">
                        <FaSave className='mx-2' />
                        Save Changes
                    </button>
                    <button
                        onClick={handleCancelChanges}
                        className="bg-blue-600 text-white text-xl px-4 py-4 rounded-lg focus:outline-none flex items-center justify-center">
                        <FaTimes className='mx-2' />
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;