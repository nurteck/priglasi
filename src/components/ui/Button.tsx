import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors min-h-11 px-6 focus-visible:outline-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-[#611821] active:bg-[#4f1319]",
  secondary: "bg-white text-accent border border-accent hover:bg-accent-soft",
  ghost: "bg-transparent text-text hover:bg-black/5",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1fba59]",
};

const sizes: Record<Size, string> = {
  md: "text-sm py-2.5",
  lg: "text-base py-3.5 px-8",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface NativeButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", children, className } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, size: _s, children: _c, className: _cl, ...rest } =
    props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
