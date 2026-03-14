"use client"

import Image from "next/image"
import { CheckCircle, ArrowRight, Bot } from "lucide-react"
import { useRouter } from "next/navigation"
import Confetti from "react-confetti"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const InterviewCompleted = () => {
  const navigate = useRouter()

  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-auth-gradient px-4 py-10 overflow-hidden">

      {/* Confetti Celebration */}
      <Confetti width={size.width} height={size.height} numberOfPieces={180} recycle={false} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 md:p-10 space-y-8"
      >

        {/* Header */}
        <div className="text-center space-y-4">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <CheckCircle className="text-green-500 w-16 h-16" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Interview Completed 🎉
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            Thank you for participating in the AI-driven interview.
          </p>
        </div>


        {/* Illustration */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl h-[220px] md:h-[300px]">
            <Image
              src="/interview-complete.jpg"
              alt="Interview Completed"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>


        {/* AI Recruiter Message */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 items-start">

          <Bot className="text-blue-600 w-6 h-6 mt-1" />

          <div className="text-left">
            <p className="font-semibold text-blue-700">
              AI Recruiter
            </p>

            <p className="text-sm text-gray-600">
              Great job completing the interview! 🚀  
              Your responses have been recorded and will now be reviewed by our recruiter.
              We will get back to you soon with the next steps.
            </p>
          </div>
        </div>


        {/* What's Next Card */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border text-center space-y-4">

          <h2 className="text-xl md:text-2xl font-semibold">
            What's Next?
          </h2>

          <p className="text-muted-foreground text-sm md:text-base">
            Our recruiter will review your interview responses and contact you
            regarding the next steps.
          </p>

          <p className="text-sm text-gray-500">
            Response expected within <span className="font-medium">2–3 business days</span>
          </p>

          {/* Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row gap-4 justify-center">

            <button
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition-all"
              onClick={() => navigate.push("/dashboard")}
            >
              Go to Dashboard
              <ArrowRight size={18} />
            </button>

            <button
              className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
                     onClick={() => navigate.push("/dashboard/createInterview")}
            >
              Practice Another Interview
            </button>

          </div>

        </div>

      </motion.div>
    </div>
  )
}

export default InterviewCompleted