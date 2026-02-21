"use client"
import { useAuth } from "@/app/context/authContext";
import { BellRing } from "lucide-react";
import Image from "next/image";
import React from "react";
import LogoutContainer from "./LogoutContainer";

const WelcomeContainer = () => {
  const {userData}=useAuth();
  console.log(userData,"checkuserdata")
  return (
    <div
      className="
        w-full rounded-xl border border-white/10
        bg-white/5 backdrop-blur-md
        px-4 py-3
        md:grid md:grid-cols-[1fr_auto]
        lg:grid-cols-[6fr_0.5fr_0.5fr]
        gap-3
      "
    >
      {/* MOBILE HEADER ROW */}
      <div className="flex items-center justify-between md:block">
        {/* Text */}
        <div>
          <h1 className="font-semibold font-mono text-gray-100 text-base sm:text-lg lg:text-xl">
            Welcome Back {userData?.name}
          </h1>
          <p className="text-gray-400 font-mono text-xs sm:text-sm">
            AI-Driven Interview, Train yourself until you get placed
          </p>
        </div>

        {/* Bell (mobile right side) */}
        <BellRing className="text-gray-300 hover:text-blue-400 transition cursor-pointer md:hidden" />
      </div>

      {/* Bell (tablet & laptop only) */}
      <div className="hidden md:flex items-center justify-center">
        <BellRing className="text-gray-300 hover:text-blue-400 transition cursor-pointer" />
      </div>

      {/* Avatar */}
        <LogoutContainer />
    </div>
  );
};

export default WelcomeContainer;
