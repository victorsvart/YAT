import {
  Home,
  Zap,
  TrendingUp,
  MessageCircle,
  Bookmark,
  User,
  Settings,
} from "lucide-react";

export const DesktopNavbar = () => {
  const menuItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Pulse", icon: Zap },
    { name: "Trending", icon: TrendingUp },
    { name: "Conversations", icon: MessageCircle },
    { name: "Saved", icon: Bookmark },
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
  ];
  return (
    <div className="fixed top-0 left-0 w-16 rounded-4xl h-screen bg-zinc-900 m-1.5">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`flex items-center justify-center transition-all h-12 w-12 mx-auto my-2 rounded-3xl cursor-pointer group ${
            item.active
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
        </div>
      ))}
    </div>
  );
};
