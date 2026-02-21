import WelcomeContainer from '@/app/components/pages/WelcomeContainer'
import Image from 'next/image'
import React from 'react'

const interviewPage = () => {
  return (
    <div className='w-full'>
            {/* Welcome */}
      <div className="mt-5">
        <WelcomeContainer />
      </div>
      {/*MAin content*/}
      <div className='px-10 mt-5 ' >
        <div className='bg-white rounded-xl'>
             <Image src={"/sidebarlogo.png"} width={190} height={200} alt="logo" className="border border-red-500" />
             <h2>AI-Powered Interview Platform</h2>

        </div>
    
      </div>

      </div>
  )
}

export default interviewPage