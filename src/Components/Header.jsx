import React from 'react'
import copyToClipboard from './copyToClipboard';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IdCard, MapPin, CalendarDays } from 'lucide-react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { SiFarcaster } from 'react-icons/si';

const Header = () => {
  return (
    <header className="py-2">
        <div className="relative">
          <img
            src="./images/cover.png"
            alt="Cover"
            className="w-full h-48 object-cover rounded-lg pointer-events-none"
          />
          <div className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
            <img src="./images/photo1.jpg" alt="@developer" className="w-full h-full object-cover pointer-events-none" />
          </div>
        </div>
        <div className="mt-16 flex justify-between items-start px-4">
          <div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center justify-center gap-2 mt-3">
                <h1 className="text-lg lg:text-2xl font-bold text-white">Jayson N. Reales</h1>
                <RiVerifiedBadgeFill className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-gray-500 cursor-pointer" title="Base name" onClick={() => copyToClipboard("senpaiii-kun.base.eth")}>@senpaiii-kun.base.eth</p>
            </div>
            <div className="flex flex-col mt-6 gap-2">
              <p className="text-gray-100 flex items-center gap-2 text-sm">
                <IdCard className="w-4 h-4" /> Developer🧑‍💻 | Web3
              </p>
              <p className="text-gray-100 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" /> Albay, Philippines <img src="./images/ph-flag.png" alt="ph" className="w-4 h-4 pointer-events-none" />  
              </p>
              <p className="text-gray-100 flex items-center gap-2 text-sm">
                <FaFacebook className="w-4 h-4" /> <a href="https://www.facebook.com/jaysonsenpai18" target="_blank" rel="noopener noreferrer">Facebook</a>
              </p>
              <p className="text-gray-100 flex items-center gap-2 text-sm">
                <SiFarcaster  className="w-4 h-4" /> <a href="https://warpcast.com/swenpai" target="_blank" rel="noopener noreferrer">Farcaster</a>
              </p>
              <p className="text-gray-100 flex items-center gap-2 text-sm">
                <FaGithub className="w-4 h-4" /> <a href="https://github.com/jaysonreales007" target="_blank" rel="noopener noreferrer">Github</a>
              </p>
              <p className="text-gray-100 flex items-center gap-2 text-sm">
                <CalendarDays className="w-4 h-4" /> Joined September 2021
              </p>
            </div>
          </div>
          <a
            href="./docs/Jayson Reales Resume.pdf"
            target="_blank"
            download="JaysonReales_Resume.pdf"
            className="py-3 px-3 lg:px-4 lg:py-2 bg-blue-500 text-sm text-white rounded-full hover:bg-blue-600 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Resume
          </a>
        </div>
    </header>
  )
}

export default Header