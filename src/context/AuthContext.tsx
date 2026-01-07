"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  updateProfile: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else {
      const defaultUser = {
        name: "Pillalamari Varun",
        email: "varun@lupira.com",
        role: "Super Admin",
      };
      setUser(defaultUser);
      localStorage.setItem("user", JSON.stringify(defaultUser));
    }
  }, []);

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
