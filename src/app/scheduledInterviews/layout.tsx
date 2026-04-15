import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import { AppSidebar } from '../components/pages/app-sidebar'

const ScheduledInterviewsLayout = ({children}:{children:React.ReactNode}) => {
  return (
       <SidebarProvider  defaultOpen={false} >
      <AppSidebar />
      <main className=" bg-auth-gradient w-full min-h-screen flex">
        <SidebarTrigger className="text-white" />
        {/* <InterviewDataProvider> */}
                  {children}
        {/* </InterviewDataProvider> */}
      </main>
    </SidebarProvider>
  )
}

export default ScheduledInterviewsLayout