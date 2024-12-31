import React from 'react';
import { useEffect, useState } from 'react';
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { useTheme } from 'next-themes';

function Card({ systemInfo, handleCardClick }) {
    const { theme } = useTheme();

    return (
        <div className="flex h-full justify-center flex-wrap gap-9">
            {systemInfo.map((each, index) => (
                <div
                    key={index}
                    className={`border rounded-xl shadow-md p-4 w-72 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.98] group EachCard 
                        bg-card text-card-foreground border-muted 
                        ${theme === 'dark' ? 'hover:border-primary' : 'hover:border-blue-200'}`}
                    onClick={handleCardClick}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <MdComputer className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-sm font-semibold text-primary group-hover:border-b-2">
                                {each.location.length > 10 ? `${each.location.slice(0, 10)}...` : each.location}
                            </h3>
                        </div>
                        <span className="text-medium font-bold text-green-700 flex">
                            ${each.rent}<p className='text-xs self-end'>/hr</p>
                        </span>
                    </div>

                    <div>
                        {Object.entries(each).map(([key, value]) =>
                            key !== "rent" && key !== "location" ? (
                                <div
                                    key={key}
                                    className={`flex justify-between items-center p-2 space-y-2 rounded-md transition-colors
                                        bg-muted text-muted-foreground 
                                        group-hover:bg-accent group-hover:text-accent-foreground`}
                                >
                                    <span className="text-xs capitalize">{key}</span>
                                    <span className={`text-xs font-medium text-primary ${key === "version" ? "italic" : ""}`}>
                                        {value === "Windows" ? <FaWindows /> : value === "Linux" ? <FcLinux /> : value}
                                    </span>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
