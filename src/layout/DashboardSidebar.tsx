"use client";

import { LayoutDashboard, Users, CalendarCheck, Wallet, X } from "lucide-react";
import { RiDashboardFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/context/LanguageContext";
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
  { labelKey: "Recruitment", icon: FiSearch, href: "/recruitment" },
  {
    labelKey: "Performance managemnt",
    icon: IoMdAnalytics,
    href: "/performance-management",
  },
  { labelKey: "Documents", icon: IoDocumentTextSharp, href: "/documents" },
  { labelKey: "Exit management", icon: TbLogout, href: "/exit-management" },
  { labelKey: "Admin settings", icon: IoMdSettings, href: "/admin-settings" },
];

export default function DashboardSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-background p-4 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">Lupira</span>
        <button onClick={() => setIsOpen(false)} className="lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="space-y-4 pt-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === route.href
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <route.icon className="h-5 w-5" />
            {t(route.labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
