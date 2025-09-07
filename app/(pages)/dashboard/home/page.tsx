"use client";

import { PostInput } from "@/app/(components)/post-input/post-input-component";
import { Check } from "lucide-react";

export default function HomePage() {
  const filterItems = [
    { label: "Tech", key: "for-you", selected: true },
    { label: "Gaming", key: "following", selected: true },
    { label: "General Yapping", key: "latest", selected: true },
  ];

  return (
    <div className="flex flex-row mx-6 text-white bg-black w-full h-screen border border-gray-600 p-1">
      <div className="flex flex-col gap-3 bg-zinc-900 w-full h-full text-white p-4">
        <PostInput />

        <div className="flex flex-row gap-3 justify-center item-center">
          {filterItems.map((item) => (
            <button
              key={item.key}
              className="flex flex-row justify-center items-center bg-zinc-950 p-2 rounded-2xl transition-all hover:bg-zinc-700"
            >
              <Check className="h-5 w-5"/>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
