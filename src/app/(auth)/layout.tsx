import React from "react";
import  "./styles/authLayout.css" 

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6
      bg-auth-gradient
      "
    >
      <div
        className="
          w-full
          max-w-6xl
          my-[15px]
          md:my-0
          grid
          grid-cols-1
          md:grid-cols-2
          md:h-[540px]
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-2xl
        "
      >
        {/* LEFT — VIDEO */}
        <div className="relative h-[35vh] md:h-full overflow-hidden rounded-2xl">
          <video
            src="/videos/Interview.mp4"
            className="absolute inset-0 h-full w-full object-fill "
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/30 via-black/40 to-black/80" />
          <div className="relative z-10 p-6 md:p-10 flex h-full flex-col justify-end text-white">
            <h1 className="text-2xl md:text-4xl font-bold">
              Practice Interviews.
              <br />
              Powered by AI.
            </h1>
            <p className="mt-4 text-sm text-white/70 max-w-sm">
              Prepare smarter, get real-time feedback, and crack your next
              interview with confidence.
            </p>
          </div>
        </div>

        {/* RIGHT — LOGIN */}
        <div className="flex h-full items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
