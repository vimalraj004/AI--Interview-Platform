import { Bell, BellRing } from "lucide-react";
import Image from "next/image";
import React from "react";

const WelcomeContainer = () => {
  return (
    <div className=" h-auto w-full  rounded-xl border border-white/10  bg-white/5 backdrop-blur-md p-1  grid grid-cols-[6fr_0.5fr_0.5fr] items-center gap-2  ">
      {/* Greetings */}
      <div className=" w-auto  ">
        <h1 className="font-semibold text-xl font-mono text-gray-100 ">
          welcome Back vimalraj
        </h1>
        <p className="text-gray-400 font-mono text-sm">
          AI-Driven Interview,Trainyourself until you get placed
        </p>
      </div>
      {/* Remainder */}
      <div className="flex items-center justify-center">
        <BellRing className="text-gray-300 hover:text-blue-400 transition" />
      </div>
      {/* ProfileIcon */}
      <div className="flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
          <Image
            src={"/codie_transparent.bdfb741fb8a3211d12e3.png"}
            height={32}
            width={32}
            className="rounded-full  bg-slate-600"
            alt="USER"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default WelcomeContainer;
