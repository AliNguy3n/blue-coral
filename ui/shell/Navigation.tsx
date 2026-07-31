"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { AUTH_ACTIONS, NAV_ITEMS, type NavItem } from "@/utils/navigation";
import { Button } from "../primitives/components/buttons/Button";
import { Icon } from "../primitives/components/buttons/Icon";

export type NavigationProps = {
  items?: NavItem[];
  className?: string;
  "aria-label"?: string;
};

export function Navigation({
  items = NAV_ITEMS,
  className,
  "aria-label": ariaLabel = "Chính",
}: NavigationProps) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openPanel) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenPanel(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPanel(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel]);

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={cn("hidden items-center gap-10 lg:flex", className)}
    >
      <ul className="flex items-center gap-1">
        {items.map((item) => (
          <NavEntry
            key={item.label}
            item={item}
            open={openPanel === item.label}
            onToggle={() =>
              setOpenPanel((current) => (current === item.label ? null : item.label))
            }
          />
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <Button href={AUTH_ACTIONS.login.href} variant="outline">
          {AUTH_ACTIONS.login.label}
        </Button>
        <Button href={AUTH_ACTIONS.signup.href} trailingIcon="arrowRight">
          {AUTH_ACTIONS.signup.label}
        </Button>
      </div>
    </nav>
  );
}

export type MobileNavigationProps = {
  items?: NavItem[];
  onNavigate?: () => void;
  className?: string;
  "aria-label"?: string;
};

export function MobileNavigation({
  items = NAV_ITEMS,
  onNavigate,
  className,
  "aria-label": ariaLabel = "Chính (di động)",
}: MobileNavigationProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const baseId = useId();

  return (
    <nav aria-label={ariaLabel} className={cn("flex flex-col gap-2 px-5 py-6", className)}>
      {items.map((item, index) => {
        const isOpen = openItem === item.label;
        const sectionId = `${baseId}-${index}`;

        return (
          <div key={item.label} className="border-b border-line-01 pb-2">
            {item.panel ? (
              <>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={sectionId}
                  onClick={() =>
                    setOpenItem((current) => (current === item.label ? null : item.label))
                  }
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-base leading-6 font-semibold text-brand-2-01"
                >
                  {item.label}
                  <Icon
                    name="chevronDown"
                    className={cn("size-6 transition-transform", isOpen && "-scale-y-100")}
                  />
                </button>

                {isOpen && (
                  <ul id={sectionId} className="flex flex-col gap-1 pb-2 pl-4">
                    {item.panel.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="group flex items-center gap-2 py-2 text-sm leading-5 text-brand-2-01"
                        >
                          {link.label}
                          <Icon
                            name="arrowRight"
                            className="size-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block py-3 text-base leading-6 font-semibold text-brand-2-01"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}

      <div className="mt-4 flex flex-col gap-3">
        <Button href={AUTH_ACTIONS.signup.href} trailingIcon="arrowRight" fullWidth>
          {AUTH_ACTIONS.signup.label}
        </Button>
        <Button href={AUTH_ACTIONS.login.href} variant="outline" fullWidth>
          {AUTH_ACTIONS.login.label}
        </Button>
      </div>
    </nav>
  );
}

function NavEntry({
  item,
  open,
  onToggle,
}: {
  item: NavItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  if (!item.panel) {
    return (
      <li>
        <Link
          href={item.href}
          className="flex items-center rounded-[80px] px-3 py-2 text-base leading-6 font-semibold text-brand-2-01 transition-colors hover:bg-brand-2-01/5"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-2 rounded-[80px] px-3 py-2 text-base leading-6 font-semibold text-brand-2-01 transition-colors hover:bg-brand-2-01/5"
      >
        {item.label}
        <Icon
          name="chevronDown"
          className={cn("size-4 transition-transform", open && "-scale-y-100")}
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute top-full -left-3 z-50 mt-[7px] w-[280px] rounded-[12px] border-t border-line-01 bg-white px-6 pt-[23px] pb-6"
        >
          <ul className="flex flex-col gap-4">
            {item.panel.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-base leading-6 font-normal text-brand-2-01 hover:font-semibold focus-visible:font-semibold"
                >
                  {link.label}
                  <Icon
                    name="arrowRight"
                    className="size-6 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
