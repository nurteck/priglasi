import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { getCurrentProfile } from "@/lib/auth";

// Доступ на /admin/* уже проверен в src/proxy.ts (Supabase-сессия + роль admin) —
// здесь просто читаем профиль, чтобы показать имя в шапке.
export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden sm:flex items-center gap-5" aria-label="Админка">
              <Link href="/admin" className="text-sm text-text hover:text-accent">Заказы</Link>
              <Link href="/admin/invites" className="text-sm text-text hover:text-accent">Приглашения</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {profile && <span className="text-sm text-muted">{profile.name}</span>}
            <LogoutButton />
          </div>
        </div>
        <nav className="sm:hidden flex items-center gap-5 px-4 pb-3" aria-label="Админка">
          <Link href="/admin" className="text-sm text-text hover:text-accent">Заказы</Link>
          <Link href="/admin/invites" className="text-sm text-text hover:text-accent">Приглашения</Link>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
