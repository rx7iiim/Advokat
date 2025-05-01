"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UpgradePlanBanner from "../UpgradePlanBanner";

export default function Sidebar( {user}) {
  const pathname = usePathname();

  const username =  user?.username ;

  if (!username) return <p>Loading Sidebar...</p>;

  const menuItems = [
    { href: "home", icon: "/home.svg", label: "Home" },
    { href: "agenda", icon: "/agenda.svg", label: "Agenda" },
    { href: "clients", icon: "/cleint.svg", label: "Clients" },
    { href: "files", icon: "/files.svg", label: "Files" },
    // Conditionally render these only if not independent lawyer
    ...(user.role !== "independent lawyer"
      ? [
          { href: "lawyers", icon: "/lawyer.svg", label: "Lawyers" },
          { href: "dashboard", icon: "/dashbord.svg", label: "Dashboard" },
        ]
      : []),
  ];

  return (
    <div className="overflow-hidden fixed">
      <aside className="w-64 bg-white h-screen p-5 flex flex-col justify-between mt-2 rounded-2xl overflow-y-auto scrollbar-hide ">
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-4 space-x-4">
          <Link href={`/`} className="flex items-center gap-2">
            <Image src="/logo bold.svg" alt="Logo" width={160} height={60} />
            <Image src="/group.svg" alt="Logo icon" width={40} height={40} />
          </Link>
        </div>

        {/* Main Menu */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 mb-3 pl-3">MAIN MENU</h2>
          <ul className="space-y-1">
            {menuItems.map(({ href, icon, label }) => (
              <li key={href}>
                <Link
                  href={`/user/${username}/${href}`}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    pathname.startsWith(`/user/${username}/${href}`)
                      ? "bg-gray-200 text-black"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Image src={icon} alt={label} width={20} height={20} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade Plan */}
        <div className="bg-gradient-to-r from-blue-800 to-cyan-400 text-white p-3 rounded-xl text-xs mt-6 ">
          <UpgradePlanBanner />
        </div>

        {/* Profile Section */}
        <button className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl mt-4">
          <Image
            src="/sofia.png"
            alt="User Avatar"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="text-left">
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </button>
      </aside>
    </div>
  );
}
