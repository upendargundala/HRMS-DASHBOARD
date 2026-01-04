"use client";
import { Bell, Search, User, Settings, LogOut, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useLanguage, type LanguageCode } from "@/src/context/LanguageContext";
import { useAuth } from "@/src/context/AuthContext";

const languages = [
  { label: "English", code: "en" as LanguageCode, flag: "🇺🇸" },
  { label: "Hindi (हिन्दी)", code: "hi" as LanguageCode, flag: "🇮🇳" },
  { label: "Tamil (தமிழ்)", code: "ta" as LanguageCode, flag: "🇮🇳" },
  { label: "Telugu (తెలుగు)", code: "te" as LanguageCode, flag: "🇮🇳" },
  { label: "Bengali (বাংলা)", code: "bn" as LanguageCode, flag: "🇮🇳" },
  { label: "Marathi (मराठी)", code: "mr" as LanguageCode, flag: "🇮🇳" },
];

export default function DashboardHeader({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (open: boolean) => void;
}) {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const selectedLang =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 flex h-16 items-center bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>



      <div className="ml-auto flex items-center gap-2 md:gap-4">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 px-2">
              <span className="text-lg">{selectedLang.flag}</span>
              <span className="hidden sm:inline text-sm font-medium">
                {selectedLang.label}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Change Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className="gap-2 cursor-pointer"
              >
                <span>{lang.flag}</span>
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </Button>

        <div className="h-6 w-px bg-border mx-1 md:mx-2" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-auto flex items-center gap-3 px-2 focus-visible:ring-0"
            >
              <div className="hidden md:flex flex-col items-end text-right">
                <p className="text-sm font-semibold leading-none">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {user?.email}
                </p>
              </div>
              <Avatar className="h-8 w-8 ring-1 ring-border">
                <AvatarImage src="/abstract-profile.png" alt="User" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground italic">
                  {user?.role}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2">
              <User className="h-4 w-4" />
              <span>{t("profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Settings className="h-4 w-4" />
              <span>{t("settings")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
