"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-muted hover:text-accent min-h-11 px-2"
    >
      <LogOut size={16} aria-hidden="true" /> Выйти
    </button>
  );
}
