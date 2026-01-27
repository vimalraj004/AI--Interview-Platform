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
    <SidebarProvider className="border-2 border-purple-950  " defaultOpen={false} >
      <AppSidebar />
      <main className="border-2 border-blue-600 ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
