import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold tracking-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * On a dark surface a tinted translucent button reads as the primary action.
 * On white it does not — it looks disabled. So the primary CTA here is solid
 * green with white text (9.5:1), and the tinted treatment demotes to secondary.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-brand-green text-white border border-brand-green shadow-card hover:bg-[#03634a] hover:shadow-glow active:scale-[0.98]",
  secondary:
    "bg-surface text-brand-green border border-brand-green/45 hover:bg-brand-green/8 hover:border-brand-green active:scale-[0.98]",
  ghost:
    "text-text-secondary border border-transparent hover:text-text-primary hover:border-line-strong hover:bg-surface-sunken/70",
  danger:
    "bg-brand-amber text-white border border-brand-amber hover:bg-[#96450a] active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...props
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(base, variants[variant], sizes[size], className);

  // tel:, wa.me and mailto: links must be plain anchors — Next's client router
  // cannot navigate to them.
  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
