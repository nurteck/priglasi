import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24 text-center">
        <div>
          <p className="font-heading text-6xl text-accent">404</p>
          <h1 className="mt-4 font-heading text-2xl">Страница не найдена</h1>
          <p className="mt-2 text-muted text-sm max-w-sm mx-auto">
            Похоже, такой страницы нет — возможно, ссылка устарела или в адресе опечатка.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/" size="lg">На главную</Button>
            <Button href="/catalog" variant="secondary" size="lg">В каталог</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
