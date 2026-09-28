import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Компактная рамка-«телефон» для превью дизайна в карточке каталога.
 * Соотношение сторон короче настоящего экрана телефона (3:4, а не 9:19) —
 * иначе в сетке из 2–4 колонок карточка растягивается на весь экран.
 * Обод тонкий, чтобы на маленьком размере не выглядеть грузно.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative mx-auto aspect-[3/4] w-full max-w-[220px] rounded-2xl border-[3px] border-text/15 bg-white shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-text/20" />
      <div className="relative h-full w-full overflow-hidden rounded-[0.9rem]">{children}</div>
    </div>
  );
}
