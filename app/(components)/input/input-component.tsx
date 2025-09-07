"use client";

import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`
        w-full
        font-semibold
        px-3
        py-1.5
        text-sm
        bg-zinc-900
        text-zinc-100
        placeholder:text-zinc-500
        border
        border-zinc-700
        rounded-md
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-zinc-400
        focus:border-zinc-400
        transition
        duration-200
        ${className ?? ""}
      `}
    />
  );
};
