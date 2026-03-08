"use client";
import React from 'react'

const UserContainer = ({ text }: { text: string }) => {
  return (
      <div className="flex justify-end">
      <div
        className="
        bg-white/10
        border border-white/10
        text-white
        px-4 py-2
        rounded-2xl
        max-w-[80%]
        text-sm md:text-base
        shadow
        "
      >
        {text}
      </div>
    </div>
  )
}

export default UserContainer