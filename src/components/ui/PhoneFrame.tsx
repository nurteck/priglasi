import type { ReactNode } from "react";
import clsx from "clsx";

/** Рамка телефона для превью приглашений в каталоге и на главной. */
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
        "relative mx-auto aspect-[9/19] w-full max-w-[260px] rounded-[2rem] border-[6px] border-text/90 bg-text/90 shadow-xl overflow-hidden",
        className
      )}
    >
      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-text/90" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-white">{children}</div>
    </div>
  );
}
