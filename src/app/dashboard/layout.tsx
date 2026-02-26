"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/pages/app-sidebar";
import { InterviewDataProvider } from "../context/interviewDataContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider  defaultOpen={false} >
      <AppSidebar />
      <main className=" bg-auth-gradient w-full min-h-screen flex">
        <SidebarTrigger className="text-white" />
        <InterviewDataProvider>
                  {children}
        </InterviewDataProvider>
      </main>
    </SidebarProvider>
  );
}
