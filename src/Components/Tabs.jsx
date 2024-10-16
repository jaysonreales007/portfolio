import React from 'react'
import { useState } from 'react'

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("home")
  return (
    <div className="flex items-center justify-start border-b text-sm w-full overflow-x-auto lg:justify-start lg:gap-5">
      {["Home", "Projects", "Skills", "Services", "About", "Contact"].map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`relative px-4 py-2 flex-shrink-0 ${
            activeTab === tab.toLowerCase()
              ? "border-b-4 border-blue-500 font-bold text-gray-200"
              : "text-gray-600"
          } ${index >= 4 ? "lg:flex" : ""}`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs