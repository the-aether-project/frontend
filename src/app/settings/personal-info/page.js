"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaEdit, FaSave, FaTimes, FaCheckCircle, FaTimesCircle, FaCamera } from 'react-icons/fa';

const PersonalInformation = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [gender, setGender] = useState('');
    const [isLandlord, setIsLandlord] = useState(true);
    const [tempIsLandlord, setTempIsLandlord] = useState(true);
    const [profilePic, setProfilePic] = useState('');
    const [editChanges, setEditChanges] = useState(false);
    const [errors, setErrors] = useState({});

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
            setIsVerified(session?.user?.emailVerified || false);
            setGender(session?.user?.gender || '');
            setProfilePic(session?.user?.image || '');
            setTempIsLandlord(isLandlord);
        }
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

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleModeChange = (e) => {
        setTempIsLandlord(e.target.value === 'landlord');
    };

    const handleSaveChanges = () => {
        // Save the updated username, email, gender, and profile picture to the server
        console.log('Changes saved:', { username, email, gender, profilePic });
        setEditChanges(false);
        setIsLandlord(tempIsLandlord);
    };

    const handleEditChanges = () => {
        setEditChanges(!editChanges);
    };

    const handleCancelChanges = () => {
        setEditChanges(false);
        setUsername(session?.user?.name || '');
        setEmail(session?.user?.email || '');
        setGender(session?.user?.gender || '');
        setProfilePic(session?.user?.image || '');
        setTempIsLandlord(isLandlord);
        setErrors({});
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen rounded-lg border-2 border-[#d3d4d4] overflow-hidden mt-4 p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Personal Information</h2>
            <div className="flex justify-center mb-6">
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
                <div className="flex items-center gap-2">
                    <label className="block text-lg font-medium text-gray-600 mb-1">Email Verified:</label>
                    {isVerified ? (
                        <FaCheckCircle className="text-green-500" />
                    ) : (
                        <FaTimesCircle className="text-red-500" />
                    )}
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-600 mb-1">Gender:</label>
                    {editChanges ? (
                        <select
                            value={gender}
                            onChange={handleGenderChange}
                            className="w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 bg-white px-3 py-2 focus:outline-none transition-colors"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            {gender || 'Not specified'}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-600 mb-1">Mode:</label>
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
                        <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            {isLandlord ? 'Landlord' : 'Tenant'}
                        </div>
                    )}
                </div>
            </div>
            {!editChanges ? (
                <div className="flex justify-center mt-10 mb-4">
                    <button
                        onClick={handleEditChanges}
                        className="bg-blue-600 text-white text-xl px-4 py-4 rounded-lg focus:outline-none flex items-center justify-center">
                        <FaEdit className='mx-2' />
                        Edit Information
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

export default PersonalInformation;