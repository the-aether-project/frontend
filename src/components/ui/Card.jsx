import React from 'react';
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { useTheme } from 'next-themes';

// function Card({ systemInfo, handleCardClick }) {
//     const { theme } = useTheme();

//     return (
//         <div className="flex h-full justify-center flex-wrap gap-9">
//             {systemInfo.map((each, index) => (
//                 <div
//                     key={index}
//                     className={`border rounded-xl shadow-md p-4 w-72 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.98] group EachCard 
//                         ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 hover:border-blue-500' : 'bg-white text-black border-gray-200 hover:border-blue-200'}`}
//                     onClick={handleCardClick}
//                 >
//                     <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center space-x-2">
//                             <MdComputer className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
//                             <h3 className="text-sm font-semibold text-primary group-hover:border-b-2">
//                                 {each.location.length > 10 ? `${each.location.slice(0, 10)}...` : each.location}
//                             </h3>
//                         </div>
//                         <span className="text-medium font-bold text-green-700 flex">
//                             ${each.rent}<p className='text-xs self-end'>/hr</p>
//                         </span>
//                     </div>

//                     <div>
//                         {Object.entries(each).map(([key, value]) =>
//                             key !== "rent" && key !== "location" ? (
//                                 <div
//                                     key={key}
//                                     className={`flex justify-between items-center p-2 space-y-2 rounded-md transition-colors
//                                         ${theme === 'dark' ? 'bg-gray-700 text-gray-300 group-hover:bg-gray-600 group-hover:text-white' : 'bg-gray-50 text-black group-hover:bg-blue-50 group-hover:text-black'}`}
//                                 >
//                                     <span className="text-xs capitalize">{key}</span>
//                                     <span className={`text-xs font-medium text-primary ${key === "version" ? "italic" : ""}`}>
//                                         {value === "Windows" ? <FaWindows /> : value === "Linux" ? <FcLinux /> : value}
//                                     </span>
//                                 </div>
//                             ) : null
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }


function Card({ item, handleCardClick }) {
    const { landlord_id, info } = item;
    const { device, display, ip_addr } = info;
    const cpu = device.cpu[0]?.name || "Unknown CPU";
    const gpu = device.gpu[0]?.name || "Unknown GPU";
    const resolution = `${display.width}x${display.height}`;
    const frameRate = display.frame_rate || "Unknown";

    return (
        <div
            className="EachCard bg-white border border-gray-200 rounded-md shadow p-3 w-48 
                       cursor-pointer transition-all duration-300
                       hover:shadow-md hover:border-blue-200"
            onClick={handleCardClick}
            key={landlord_id}
            data-id={landlord_id}
        >
            <div className="text-sm font-medium text-gray-700 mb-2">
                IP: {ip_addr}
            </div>
            <div className="text-xs text-gray-500 mb-1">
                CPU: <span className="font-semibold">{cpu}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
                GPU: <span className="font-semibold">{gpu}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
                Resolution: <span className="font-semibold">{resolution}</span>
            </div>
            <div className="text-xs text-gray-500">
                Frame Rate: <span className="font-semibold">{frameRate} fps</span>
            </div>
        </div>
    );
}

export default Card;