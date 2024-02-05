"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";

const DashSidebarContext = createContext();

const DashSidebar = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <aside className="h-screen">
      <nav className="flex flex-col h-full bg-white border-r">
        <div className="flex p-4 pb-2 justify-between items-center">
          {/*<img
            src="https://img.logoipsum.com/243.svg"
            alt="Dummy Logo"
            className={`overflow-hidden transition-all ${
              isCollapsed ? "w-0" : "w-32"
            }`}
          />*/}
          <div
            className={`leading-none overflow-hidden transition-all ${
              isCollapsed ? "w-0" : "w-32"
            }`}
          >
            <h2 className="font-medium text-base text-tif-lavender">Admin</h2>
            <h1 className="font-semibold text-md text-tif-lavender">
              Dashboard
            </h1>
          </div>
          <button
            onClick={handleCollapse}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Bars3Icon
              className={`${
                isCollapsed ? "rotate-0" : "rotate-180"
              } h-6 w-6 transition-all duration-300`}
            />
          </button>
        </div>
        <DashSidebarContext.Provider value={{ isCollapsed }}>
          <ul className="flex-1 px-3">{children}</ul>
        </DashSidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default DashSidebar;

export function DashSidebarItem({ icon, text, page, alert }) {
  const { isCollapsed } = useContext(DashSidebarContext);
  const pathname = usePathname();
  const active = pathname === page ? true : false;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-r from-tif-blue to-tif-lavender text-white"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Link href={page} className="flex">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            isCollapsed ? "w-0" : "w-52 ml-3"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              isCollapsed ? "top-2" : ""
            }`}
          />
        )}

        {isCollapsed && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-gradient-to-br from-tif-blue to-tif-pink text-white text-sm shadow-md
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}
