// src/components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div data-theme={theme}>
      {children}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default function ThemeToggle({ 
  theme, 
  toggleTheme 
}: { 
  theme?: "light" | "dark";
  toggleTheme?: () => void 
}) {
  const [internalTheme, setInternalTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setInternalTheme(savedTheme || systemTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = internalTheme === "light" ? "dark" : "light";
    setInternalTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    if (toggleTheme) toggleTheme();
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const currentTheme = theme || internalTheme;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="rounded-full"
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} theme`}
    >
      {currentTheme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}