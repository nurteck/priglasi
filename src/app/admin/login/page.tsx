"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Неверный email или пароль");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Supabase не настроен — проверьте .env.local");
    } finally {
      setLoading(false);
    }
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
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent"
              autoComplete="username"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm min-h-11 focus-visible:outline-2 focus-visible:outline-accent"
              autoComplete="current-password"
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
