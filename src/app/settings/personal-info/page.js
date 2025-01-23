"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/components/ui/SessionProvider";
import { useRouter } from "next/navigation";
import {
    FaUserCircle,
    FaEdit,
    FaSave,
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

const PersonalInformation = () => {
    const { session, status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(true);
    const [gender, setGender] = useState("");
    const [isLandlord, setIsLandlord] = useState(false);
    const [tempIsLandlord, setTempIsLandlord] = useState(true);
    const [profilePic, setProfilePic] = useState("");
    const [editChanges, setEditChanges] = useState(false);
    const [errors, setErrors] = useState({});
    const [tempUsername, setTempUsername] = useState("");
const [tempProfilePic, setTempProfilePic] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/login");
    }, [session, status, router]);

    useEffect(() => {
        if (session) {
            setUsername(session?.username || "");
            setTempUsername(session?.username || "");
            setEmail(session?.email || 'test@gmail.com');
            setIsVerified(session?.user?.emailVerified || true);
            setGender(session?.user?.gender || "");
            setProfilePic(session?.user?.image || "");
            setTempProfilePic(profilePic);
            setTempIsLandlord(isLandlord);
        }
    }, [session]);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setTempProfilePic(reader.result);
            reader.readAsDataURL(file);
        }
    };
    const handleUsernameChange = (e) => {
        setTempUsername(e.target.value);
    };
    const handleSaveChanges = () => {
        console.log("Changes saved:", { username, email, gender, profilePic });
        setUsername(tempUsername);
        setProfilePic(tempProfilePic);
        setIsLandlord(tempIsLandlord);
        setEditChanges(false);
        
    };
    const handleModeChange = (e) => {
        setTempIsLandlord(e.target.value === 'landlord');
    };
    const handleEditChanges = () => {
        setEditChanges(!editChanges);
    };
    const handleCancelChanges = () => {
        setEditChanges(false);
        setTempUsername(username);
        setTempProfilePic(profilePic);
        setTempIsLandlord(isLandlord);
        setErrors({});
    };


    if (status === "loading") return <div>Loading...</div>;

    return (
        <div className="min-h-screen rounded-lg overflow-hidden bg-background text-foreground">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Personal Information
            </h2>

            {/* Profile Photo Section */}
            <div className="flex items-center justify-between mb-8 space-x-8 rounded-3xl bg-muted px-4 py-2">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 flex items-center rounded-full bg-background flex-shrink-0">
                        {tempProfilePic ? (
                            <img
                                src={tempProfilePic}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <FaUserCircle className="w-full h-full text-muted-foreground" />
                        )}
                    </div>
                    <span className="font-medium">{username || "Username"}</span>
                </div>
                {editChanges && (
                <div className="flex flex-col space-y-2">
                    
        
                    <label className="bg-blue-600 text-white px-2 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block text-center">
                        Change Profile Photo
                        <input
                            type="file"
                            accept="image/*"
                            disabled={!editChanges}
                            onChange={handleProfilePicChange}
                            className="hidden"
                        />
                    </label>
                   
                </div>
                )}
            </div>

            {/* Information Fields */}
            <div className="space-y-4">
                <div>
                    <label className="block text-lg font-medium text-muted-foreground mb-1">
                        Username:
                    </label>
                    <input
                        type="text"
                        value={tempUsername}
                        onChange={handleUsernameChange}
                        disabled={!editChanges}
                        className={`w-full rounded-lg ${editChanges
                            ? "border-2 border-input focus:border-blue-500 bg-background"
                            : "border-transparent bg-muted"
                            } px-3 py-2 focus:outline-none transition-colors`}
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-muted-foreground mb-1">Email:</label>
                    <p className="w-full rounded-lg border-transparent bg-muted px-3 py-2">{email}</p>
                </div>


                <div>
                    <label className="block text-lg font-medium text-muted-foreground mb-1">
                        Account Status:
                    </label>
                    <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
                        {isVerified ? (
                            <>
                                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                <span className="text-green-600 font-medium">Verified</span>
                            </>
                        ) : (
                            <>
                                <FaTimesCircle className="text-red-500 flex-shrink-0" />
                                <span className="text-red-600 font-medium">Unverified</span>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-medium text-muted-foreground mb-1">
                        Gender:
                    </label>
                    {editChanges ? (
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full rounded-lg border-2 border-input focus:border-blue-500 bg-background px-3 py-2 focus:outline-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <div className="bg-muted px-3 py-2 rounded-lg">
                            {gender || "Not specified"}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-lg font-medium text-muted-foreground mb-1">Mode:</label>
                    <div className={`${editChanges ? 'space-x-4' : 'bg-muted px-3 py-2 rounded-lg'}`}>
                        {editChanges ? (
                            <>
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
                            </>
                        ) : (
                            <>{isLandlord ? 'Landlord' : 'Tenant'}</>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-10 gap-4">
                {editChanges ? (
                    <>
                        <button
                            onClick={handleSaveChanges}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaSave /> Save Changes
                        </button>
                        <button
                            onClick={handleCancelChanges}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleEditChanges}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <FaEdit /> Edit Information
                    </button>
                )}
            </div>
        </div>
    );
};

export default PersonalInformation;