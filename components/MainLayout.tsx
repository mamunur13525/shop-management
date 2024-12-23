"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar  />
      <main className="w-full">
        <SidebarTrigger />
        <section className="w-full  mx-auto px-4 pb-8">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
