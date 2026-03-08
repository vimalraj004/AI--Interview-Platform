"use client";
import React from 'react'
import { conversationItem } from "@/app/types/interviewStartPage";
import { useEffect, useRef } from "react";
import AssistantContainer from './AssistantContainer';
import UserContainer from './UserContainer';

interface conversationPanelProps {
  allConversation: conversationItem[];
}
const ConversationContainer = ({ allConversation }: conversationPanelProps) => {
        const bottomRef = useRef<HTMLDivElement | null>(null);
        useEffect(()=>{
            bottomRef.current?.scrollIntoView({behavior:"smooth"})
        },[allConversation])
  return (
        <div
      className="
      w-full
      h-[55vh] md:h-[65vh] lg:h-[70vh]
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      shadow-xl
      flex flex-col
      "
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-blue-200 font-semibold text-sm md:text-base">
          Conversation
        </h3>
      </div>

      {/* Messages */}
      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        space-y-4
        scrollbar-thin
        scrollbar-thumb-blue-500/30
        "
      >
        {allConversation.map((msg, index) => {
          if (msg.role === "assistant") {
            return <AssistantContainer key={index} text={msg.content} />;
          }

          if (msg.role === "user") {
            return <UserContainer key={index} text={msg.content} />;
          }

          return null;
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default ConversationContainer