"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { BRAND, CONTACT, NAV_LINKS, telLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet is closed by the link's own onClick rather than by an
  // effect watching `pathname` — setting state synchronously in an effect
  // triggers a cascading render, and the click is the actual event anyway.

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-line-strong bg-surface/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 py-4">
        <Link href="/" aria-label={`${BRAND.name} home`}>
          <Logo priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-brand-green" : "text-text-secondary hover:text-text-primary",
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-brand-green shadow-glow"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={telLink()} variant="ghost" size="sm">
            <Phone className="h-4 w-4" aria-hidden />
            {CONTACT.phoneDisplay}
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary" size="sm">
            Request a quote
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong text-text-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-surface-raised/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-text-secondary hover:bg-white/5 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 grid gap-2">
                <ButtonLink href={telLink()} variant="secondary" size="lg">
                  <Phone className="h-4 w-4" aria-hidden />
                  Call {CONTACT.phoneDisplay}
                </ButtonLink>
                <ButtonLink href="/contact" variant="primary" size="lg">
                  Request a quote
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
