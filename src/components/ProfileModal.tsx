"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: Props) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateProfile({ name, role });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
