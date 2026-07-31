"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { IconButton } from "../primitives/components/buttons/IconButton";
import { Logo } from "../primitives/components/buttons/Logo";
import { MobileNavigation, Navigation } from "./Navigation";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        drawerOpen ? "bg-bg-05 lg:bg-white" : "bg-white",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1512px] items-center justify-between px-5 md:px-10 lg:h-20 xl:px-[86px]">
        <Link href="/" aria-label="Qtable — trang chủ" className="shrink-0">
          <Logo size="sm" priority className="lg:hidden" />
          <Logo size="md" priority className="hidden lg:block" />
        </Link>

        <Navigation />

        <IconButton
          icon={drawerOpen ? "close" : "hamburger"}
          label={drawerOpen ? "Đóng menu" : "Mở menu"}
          variant={drawerOpen ? "tint" : "ghost"}
          iconClassName={drawerOpen ? "size-4" : "size-7"}
          radius={drawerOpen ? "8" : "full"}
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          onClick={() => setDrawerOpen((open) => !open)}
          className="lg:hidden"
        />
      </div>

      <div
        id="mobile-drawer"
        hidden={!drawerOpen}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-hidden bg-bg-05 lg:hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-481px] left-[-95px] h-[564px] w-[518px] bg-[url('/Mobile_Nav_Background_Icon.svg')] bg-contain bg-no-repeat"
        />
        <div className="relative h-full overflow-y-auto">
          <MobileNavigation onNavigate={() => setDrawerOpen(false)} />
        </div>
      </div>
    </header>
  );
}
