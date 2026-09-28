"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Не удалось войти");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-black/5 p-8">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="font-heading text-xl text-center">Вход в админку</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent"
              autoFocus
            />
          </div>
          {error && <p className="text-xs text-accent">{error}</p>}
          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Входим…" : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
}
