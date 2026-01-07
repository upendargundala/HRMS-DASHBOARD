"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useAuth } from "@/src/context/AuthContext";
import { cn } from "@/src/lib/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // ✅ ADD

  useEffect(() => {
    setIsClient(true);
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isClient && !isLoading && !user && !isLoginPage) {
      router.push("/login");
    }
  }, [isClient, isLoading, user, isLoginPage, router]);

  if (!isClient || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  if (isLoginPage || !user) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isExpanded={isSidebarExpanded}              
        setIsExpanded={setIsSidebarExpanded}      
      />

      {/* Dashboard Content */}
      <div
        className={cn(
          "flex-1",
          isSidebarExpanded ? "lg:ml-64" : "lg:ml-20" // ✅ SYNC WIDTH
        )}
      >
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-4 md:p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
