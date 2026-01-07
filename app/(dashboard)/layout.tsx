"use client";

import { useState } from "react";
import DashboardSidebar from "@/src/layout/DashboardSidebar";
import DashboardHeader from "@/src/layout/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-100">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="lg:pl-64 transition-all duration-300">
        <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
        <main className="pt-16 p-6 flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}