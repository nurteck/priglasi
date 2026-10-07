import clsx from "clsx";

/** Розетка из тонких золотых линий — использована в hero и в разделе «Популярные дизайны». */
export function Ornament({ className, spin = true }: { className?: string; spin?: boolean }) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={clsx("absolute inset-0 h-full w-full", spin && "hero-rotate-slow", className)}
      aria-hidden="true"
    >
      <circle cx="320" cy="320" r="300" fill="none" stroke="rgba(216,178,122,.14)" strokeWidth="1" strokeDasharray="2 10" />
      <circle cx="320" cy="320" r="230" fill="none" stroke="rgba(216,178,122,.18)" strokeWidth="1" />
      <circle cx="320" cy="320" r="90" fill="none" stroke="rgba(216,178,122,.22)" strokeWidth="1" />
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <ellipse
          key={deg}
          cx="320"
          cy="320"
          rx="230"
          ry="90"
          stroke="rgba(216,178,122,.16)"
          strokeWidth="1"
          fill="none"
          transform={`rotate(${deg} 320 320)`}
        />
      ))}
    </svg>
  );
}
