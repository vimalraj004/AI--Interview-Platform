"use client";
import React from 'react'

const AssistantContainer = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-start">
      <div
        className="
        bg-blue-500/20
        border border-blue-400/20
        text-blue-100
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

export default AssistantContainer