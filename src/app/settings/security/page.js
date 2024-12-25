"use client"
import React, { useState } from 'react';
import { FaLock, FaUnlock, FaKey, FaShieldAlt,FaCheckCircle,FaEye,FaEyeSlash } from 'react-icons/fa';

const Security = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Handle password change logic here
        console.log('Password changed:', { currentPassword, newPassword, confirmPassword });
    };

    const handle2FAToggle = () => {
        setIs2FAEnabled(!is2FAEnabled);
        // Handle 2FA toggle logic here
        console.log('2FA status:', is2FAEnabled);
    };

    return (
        <div className="min-h-screen rounded-lg overflow-hidden bg-white px-6">
          
            
            <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-center mb-6">Security Settings</h2>
                {/* Change Password Section */}
                <div className=" px-6 rounded-lg ">
                
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                         Change Password
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-2 ">
                        <div >
                            <label className="block text-lg  text-gray-600 ">Current Password:</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 bg-white px-3 py-1 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-lg  text-gray-600 ">New Password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 bg-white px-3 py-1 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-lg  text-gray-600 ">Confirm New Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 bg-white px-3 py-1 focus:outline-none transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                             Change Password
                        </button>
                    </form>
                </div>

                {/* Forgot Password Section */}
                <div className=" p-6 rounded-lg ">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                         Forgot Password
                    </h3>
                    <p className="text-gray-600 mb-4">If you forgot your password, you can reset it by clicking the button below.</p>
                    <button
                        onClick={() => alert('Password reset link sent to your email')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                       Reset Password
                    </button>
                </div>

                {/* Two-Factor Authentication Section */}
                <div className=" px-6 py-2 rounded-lg ">
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        Two-Factor Authentication (2FA)
                    </h3>
                    <p className="text-gray-600 mb-1">Enhance the security of your account by enabling Two-Factor Authentication (2FA).</p>
                    {/* <div className="flex items-center gap-4">
                        <label className="block text-lg font-medium text-gray-600 ">Enable 2FA:</label>
                        <input
                            type="checkbox"
                            checked={is2FAEnabled}
                            onChange={handle2FAToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div> */}
                    {is2FAEnabled ? (
                        <div className="flex items-center gap-2 mt-4">
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-green-600 font-medium">2FA is enabled</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 mt-4">
                            
                            <span className="text-red-600 font-medium">2FA is not enabled</span>
                            <button
                                onClick={handle2FAToggle}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 ml-4"
                            >
                                Enable 2FA
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Security;
