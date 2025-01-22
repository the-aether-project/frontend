"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/ui/SessionProvider';
import { useRouter, usePathname } from 'next/navigation';
import Card from '@/components/ui/Card';
import { Clock, MapPin } from 'lucide-react';
import { FaMicrochip } from "react-icons/fa6";
import { useTheme } from 'next-themes';
import { checkSession } from '@/components/ui/auth/checkSession';
import { webSocket } from '@/lib/apiClient';

import { ws_landlorddevices } from '@/lib/apiClient';

const DashboardPage = () => {
    const { session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();
    checkSession();


    const [clickedMoreInfo, setClickedMoreInfo] = useState(false);
    const [selectionMethod, setSelectionMethod] = useState("Lowest Rate");
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [systemInfo, setSystemInfo] = useState([{
        "landlord_id": 1,
        "info": {
            "device": {
                "cpu": [
                    {
                        "name": "don",
                        "size": 0
                    }
                ],
                "gpu": [
                    {
                        "name": "<>",
                        "size": 0
                    }
                ]
            },
            "display": {
                "frame_rate": 24,
                "height": 1080,
                "width": 1920
            },
            "ip_addr": "0.0.0.0"
        }
    }]);

    useEffect(() => {
        console.log("dashboard status", status)
        if (session) {
            handleSelection();
        }
    }, [status])

    // const systemInfo = [
    // {
    //     "landlord_id": 1,
    //     "info": {
    //         "device": {
    //             "cpu": [
    //                 {
    //                     "name": "don",
    //                     "size": 0
    //                 }
    //             ],
    //             "gpu": [
    //                 {
    //                     "name": "<>",
    //                     "size": 0
    //                 }
    //             ]
    //         },
    //         "display": {
    //             "frame_rate": 24,
    //             "height": 1080,
    //             "width": 1920
    //         },
    //         "ip_addr": "0.0.0.0"
    //     }
    // },
    //     {
    //         "landlord_id": 2,
    //         "info": {
    //             "device": {
    //                 "cpu": [
    //                     {
    //                         "name": "hero",
    //                         "size": 0
    //                     }
    //                 ],
    //                 "gpu": [
    //                     {
    //                         "name": "<>",
    //                         "size": 0
    //                     }
    //                 ]
    //             },
    //             "display": {
    //                 "frame_rate": 24,
    //                 "height": 1080,
    //                 "width": 1920
    //             },
    //             "ip_addr": "0.0.0.0"
    //         }
    //     }
    // ];


    //  useEffect for WebSocket initialization
    useEffect(() => {

        const initWebSocket = async () => {
            try {
                const socket = await webSocket();

                socket.onmessage = function (event) {
                    try {
                        const data = JSON.parse(event?.data);
                        if (data.type === "DEVICES") {
                            console.log("Devices___", data)
                            setSystemInfo(data.devices)
                        } else if (data.type === "ERROR") {
                            console.log("Error __-")
                        }
                    } catch (error) {
                        console.log("Error __-")
                    }
                };
            } catch (error) {
                console.error('WebSocket initialization failed:', error);
            }
        };
        initWebSocket();
    }, []);


    // Initialize selectedInfo
    useEffect(() => {

        // (async () => {
        //     const landlordDevices = await ws_landlorddevices();
        //     console.log("got landlord devices")
        // })()


        if (!selectedInfo && systemInfo.length > 0) {
            setSelectedInfo(systemInfo[0].info);
        }
    }, []);



    const handleCardClick = (e) => {
        e.preventDefault();
        setClickedMoreInfo(true);
        const selected_elm = e.target.closest(".EachCard");

        if (selected_elm) {
            const landlord_id = selected_elm.dataset.id;
            const retrive_info = systemInfo.filter(each => each.landlord_id == landlord_id);
            if (retrive_info.length > 0) {
                setSelectedInfo(retrive_info[0].info);
            }
        }
    };

    const handleSelection = (type = "rate_asc") => {
        let clonedArray = systemInfo.slice();
        let method = "";

        switch (type) {
            case "rate_asc":
                clonedArray.sort((a, b) => a.rent - b.rent);
                method = "Lowest Rate";
                break;
            case "rate_dsc":
                clonedArray.sort((a, b) => b.rent - a.rent);
                method = "Highest Rate";
                break;
            default:
                clonedArray.sort((a, b) => a.rent - b.rent);
                method = "Lowest Rate";
                break;
        }

        setSelectionMethod(method);
    };

    if (status === "loading" || !systemInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`min-h-screen bg-background text-foreground p-5`}>
            {systemInfo.length <= 0 &&
                <p className='italic text-gray-500 w-full bg-tertiary bg-opacity-30 text-center mt-5 p-2 shadow-sm'>
                    No Device is online right now.
                    <b>Please come back later!</b>
                </p>
            }

            <div className='p-5'>
                <div className='flex justify-between'>
                    <h1 className='font-medium text-medium text-primary border-b-[8px] inline-block border-tertiary mb-5'>Selected Device</h1>
                    <h1 className='font-medium text-medium text-primary border-b-[8px] inline-block mb-5 mr-10'>{selectionMethod}</h1>
                </div>

                {selectedInfo && (
                    <div className='flex flex-col lg:flex-row text-primary gap-5 justify-around'>
                        {console.log("showing, ", selectedInfo)}
                        <div className={`space-y-10 box-border w-full  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-10 rounded-lg shadow-md`}>
                            <div className='gap-1 text-green-700 text-xl'>
                                <span className='flex'>
                                    <p className='font-bold text-5xl'>{selectedInfo.rent || 10}</p>
                                    <p className='italic text-sm self-end'>/hr</p>
                                </span>
                                <span className='flex space-x-2 items-baseline'>
                                    <Clock />
                                    <b className='text-primary text-sm'>to rent the device</b>
                                </span>
                            </div>
                            <button
                                className='border-2 py-3 px-9 rounded-lg font-medium bg-green-700 text-white hover:scale-[0.99]'
                                onClick={() => {
                                    router.push(`${pathname}/playground/${session?.username}`);
                                }}
                            >
                                Rent now
                            </button>
                        </div>

                        <div className={`flex flex-col lg:flex-row justify-around gap-5  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-10 rounded-lg shadow-md w-full`}>
                            <div className='flex flex-col gap-5 text-medium font-medium p-10 space-y-10 box-border w-fit rounded-lg self-baseline'>
                                <span className='space-y-5'>
                                    <MapPin width={80} height={40} />
                                    <p>{selectedInfo.ip_addr}</p>
                                </span>
                            </div>

                            <div className='flex flex-col gap-5 text-medium font-medium p-10 space-y-10 box-border w-fit'>
                                <span className='flex gap-5'>
                                    <p className='italic'>{selectedInfo.device?.cpu[0]?.name}</p>
                                    <p className='font-bold text-5xl'>{selectedInfo.device?.cpu[0]?.size}</p>
                                </span>
                                <span className='flex items-baseline gap-2 pl-12'>
                                    <FaMicrochip />
                                    <p className='font-bold'>{selectedInfo.device?.gpu[0]?.name}</p>
                                </span>
                            </div>
                        </div>

                        <div className={`flex flex-col gap-5 text-medium font-medium p-10 space-y-10 w-full box-border  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-md`}>
                            <img
                                src="./1st_step.jpeg"
                                alt="Device"
                                className="w-full rounded-3xl border-8 border-gray-300 shadow-lg hover:shadow-inner"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className='p-10'>
                <div className='flex justify-between'>
                    <h1 className='font-medium text-medium text-primary border-b-[8px] inline-block border-tertiary mb-5'>Available Devices</h1>
                    <h1 className='font-medium text-medium text-primary border-b-[8px] inline-block mb-5 mr-10'><b>Total:</b> {systemInfo.length}</h1>
                </div>
                <div className="flex flex-wrap gap-9">
                    {systemInfo.length > 0 &&
                        systemInfo.map(each => (
                            <Card
                                key={each.landlord_id}
                                item={each}
                                handleCardClick={handleCardClick}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;