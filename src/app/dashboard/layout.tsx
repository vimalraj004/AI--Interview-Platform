"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider  defaultOpen={false} >
      <AppSidebar />
      <main className=" bg-auth-gradient w-full min-h-screen">
        <SidebarTrigger className="text-white" />
        {children}
      </main>
    </SidebarProvider>
  );
}
