"use client";

import { useState } from "react";
import {
  Home,
  Zap,
  TrendingUp,
  MessageCircle,
  User,
  Settings,
} from "lucide-react";
import Link from "next/link";

export const DesktopNavbar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard"); 

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/home", icon: Home },
    { name: "Pulse", path: "/dashboard/pulse", icon: Zap },
    { name: "Trending", path: "/dashboard/trending", icon: TrendingUp },
    { name: "Chats", path: "/dashboard/chats", icon: MessageCircle },
    { name: "Profile", path: "/dashboard/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const onMenuItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <div className="fixed left-0 w-16 rounded-4xl h-screen bg-zinc-900 m-1.5">
      {menuItems.map((item) => (
        <Link
          href={item.path}
          key={item.name}
          onClick={() => onMenuItemClick(item.name)}
          className={`flex items-center justify-center transition-all h-12 w-12 mx-auto my-2 rounded-3xl cursor-pointer group ${
            activeItem === item.name
              ? "bg-white text-black"
              : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
          }`}
        >
          <item.icon className="h-6 w-6" />
          <span
            className="
            absolute
            font-semibold
            w-auto
            p-2
            m-2
            min-w-max
            left-14
            text-white
            bg-gray-900
            text-xs transition-all
            duration-100
            scale-0
            origin-left
            group-hover:scale-100"
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};
