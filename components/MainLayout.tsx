"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);



  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <AppSidebar  />
      <main className="w-full">
        <SidebarTrigger />
        <section className="w-full  mx-auto px-4 pb-8">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
