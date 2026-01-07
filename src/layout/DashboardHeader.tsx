// DashboardHeader.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useLanguage } from "@/src/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileModal from "@/src/components/ProfileModal";
import {
  Bell,
  Globe,
  ChevronDown,
  LogOut,
  Menu,
  Edit,
  User,
} from "lucide-react";

interface DashboardHeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({
  setIsSidebarOpen,
}: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Memoize languages to prevent recreation on each render
  const languages = useMemo(() => [
    { code: "en-us", name: "English (US)", display: "English (US)", native: "English (US)" },
    { code: "hi", name: "Hindi", display: "हिन्दी (Hindi)", native: "हिन्दी" },
    { code: "mr", name: "Marathi", display: "मराठी (Marathi)", native: "मराठी" },
    { code: "ml", name: "Malayalam", display: "മലയാളം (Malayalam)", native: "മലയാളം" },
    { code: "kn", name: "Kannada", display: "ಕನ್ನಡ (Kannada)", native: "ಕನ್ನಡ" },
    { code: "ta", name: "Tamil", display: "தமிழ் (Tamil)", native: "தமிழ்" },
    { code: "te", name: "Telugu", display: "తెలుగు (Telugu)", native: "తెలుగు" },
    { code: "gu", name: "Gujarati", display: "ગુજરાતી (Gujarati)", native: "ગુજરાતી" },
    { code: "bn", name: "Bengali", display: "বাংলা (Bengali)", native: "বাংলা" },
    { code: "ur", name: "Urdu", display: "اردو (Urdu)", native: "اردو" },
    { code: "or", name: "Odia", display: "ଓଡ଼ିଆ (Odia)", native: "ଓଡ଼ିଆ" },
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current language display name
  const currentLanguageDisplay = useMemo(() => {
    const lang = languages.find(l => l.code === language) || languages[0];
    return lang.display;
  }, [language, languages]);

  if (!mounted) {
    return (
      <header className="sticky top-0 left-0 right-0 z-30 flex items-center justify-between bg-background dark:bg-neutral-900 px-6 py-4 border-b dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-30 flex items-center justify-between bg-background dark:bg-neutral-900 px-6 py-4 border-b dark:border-neutral-800">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="max-w-[120px] truncate">{currentLanguageDisplay}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                >
                  <span>{lang.native}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {lang.name !== lang.native ? lang.name : ''}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user?.name || "User"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || "No email"}</p>
              </div>

              <DropdownMenuItem 
                onClick={() => setIsProfileModalOpen(true)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={logout} 
                className="text-red-600 dark:text-red-400 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}