"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/context/LanguageContext";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaCalendarDays, FaMoneyBill1Wave } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoMdAnalytics, IoMdSettings } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const routes = [
  { labelKey: "dashboard", icon: RiDashboardFill, href: "/" },
  { labelKey: "employees", icon: FaUsers, href: "/employees" },
  { labelKey: "attendance", icon: FaCalendarDays, href: "/attendance" },
  { labelKey: "payroll", icon: FaMoneyBill1Wave, href: "/payroll" },
  { labelKey: "recruitment", icon: FiSearch, href: "/recruitment" },
  {
    labelKey: "performance_management",
    icon: IoMdAnalytics,
    href: "/performance-management",
  },
  { labelKey: "documents", icon: IoDocumentTextSharp, href: "/documents" },
  { labelKey: "exit_management", icon: TbLogout, href: "/exit-management" },
  { labelKey: "admin_settings", icon: IoMdSettings, href: "/admin-settings" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isExpanded?: boolean;
  setIsExpanded?: (expanded: boolean) => void;
}

export default function DashboardSidebar({
  isOpen,
  setIsOpen,
  isExpanded = true,
  setIsExpanded,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpand = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    setIsExpanded?.(newExpandedState);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          expanded ? "w-64" : "w-20"
        )}
      >
        <div className={cn(
          "flex items-center justify-between p-4 border-b",
          !expanded && "flex-col justify-center gap-2"
        )}>
          {expanded ? (
            <>
              <span className="text-xl font-bold text-primary">Lupira</span>
              <button onClick={() => setIsOpen(false)} className="lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-primary">L</span>
              <button onClick={() => setIsOpen(false)} className="lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <nav className={cn("space-y-1 pt-4", !expanded && "px-2")}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md py-3 text-sm font-medium mx-2",
                pathname === route.href
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-muted-foreground",
                !expanded && "justify-center px-0 mx-1"
              )}
              title={expanded ? undefined : t(route.labelKey)}
            >
              <route.icon className={cn("h-5 w-5", !expanded && "mx-auto")} />
              {expanded && <span>{t(route.labelKey)}</span>}
            </Link>
          ))}
        </nav>

        {/* Expand/Collapse Button */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={toggleExpand}
            className={cn(
              "flex items-center justify-center w-full py-2 text-sm font-medium rounded-md bg-muted transition-colors",
              !expanded && "px-0"
            )}
            title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(false)}
        />
      )}
    </>
  );
}