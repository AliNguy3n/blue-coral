"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "./Icon";
import { useListboxDropdown } from "./useListboxDropdown";
import type { IconName } from "@/utils/icons";

export type BasicOption = {
  value: string;
  label: string;
  icon?: IconName | (string & {});
  badge?: string;
};

export type RadioButtonBasicProps = {
  options: BasicOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  withNotch?: boolean;
  className?: string;
  "aria-label"?: string;
};

const NOTCH_SRC = "/tab_notch.svg";

export function RadioButtonBasic({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  withNotch = true,
  className,
  "aria-label": ariaLabel = "Chọn nhóm ngành",
}: RadioButtonBasicProps) {
  const fallback = defaultValue ?? options[0]?.value;
  const [uncontrolled, setUncontrolled] = useState(fallback);
  const isControlled = controlledValue !== undefined;
  const active = isControlled ? controlledValue : uncontrolled;
  const activeOption = options.find((option) => option.value === active) ?? options[0];

  const select = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  const {
    listId,
    open,
    setOpen,
    rootRef,
    triggerRef,
    listRef,
    choose,
    onTriggerKeyDown,
    onListKeyDown,
  } = useListboxDropdown(select);

  if (options.length === 0) return null;

  const notch = (side: "left" | "right") =>
    withNotch ? (
      <img
        src={NOTCH_SRC}
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
        className={cn("size-6 shrink-0 self-start", side === "left" && "-scale-x-100")}
      />
    ) : null;

  return (
    <div className={cn("flex w-full items-start justify-center", className)}>
      {notch("left")}

      <div className="flex rounded-b-[24px] bg-white px-2.5 pb-2.5 lg:hidden">
        <div ref={rootRef} className="relative">
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-label={`${ariaLabel}: ${activeOption?.label ?? ""}`}
            onClick={() => setOpen((current) => !current)}
            onKeyDown={onTriggerKeyDown}
            className={cn(
              "relative flex h-9 w-[200px] cursor-pointer items-center justify-center gap-[5px] rounded-[24px] bg-brand-2-01 px-3 text-support-white",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2-01",
            )}
          >
            {activeOption?.icon && <Icon name={activeOption.icon} className="size-4" />}
            <span className="truncate text-sm leading-5 font-semibold">
              {activeOption?.label}
            </span>
            {activeOption?.badge && (
              <span className="shrink-0 rounded-[24px] bg-brand-02 px-2 py-1 text-[10px] leading-4 font-extrabold uppercase text-brand-2-01">
                {activeOption.badge}
              </span>
            )}
            <Icon
              name="chevronDown"
              className={cn(
                "absolute top-1/2 right-3 size-4 -translate-y-1/2 transition-transform",
                open && "-scale-y-100",
              )}
            />
          </button>

          {open && (
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={ariaLabel}
              onKeyDown={onListKeyDown}
              className="absolute top-full left-0 z-20 mt-2.5 flex w-[200px] flex-col gap-1 rounded-[24px] bg-white p-2.5 shadow-dropdown"
            >
              {options.map((option) => {
                const isActive = option.value === active;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => choose(option.value)}
                    className={cn(
                      "flex h-9 w-full cursor-pointer items-center gap-[5px] rounded-[24px] px-3 text-left transition-colors",
                      "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-2-01",
                      isActive
                        ? "bg-brand-2-01 text-support-white"
                        : "text-brand-2-01 hover:bg-brand-2-01/5",
                    )}
                  >
                    {option.icon && <Icon name={option.icon} className="size-4" />}
                    <span className="truncate text-sm leading-5 font-semibold">
                      {option.label}
                    </span>
                    {option.badge && (
                      <span className="ml-auto shrink-0 rounded-[24px] bg-brand-02 px-2 py-1 text-[10px] leading-4 font-extrabold uppercase text-brand-2-01">
                        {option.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="hidden rounded-b-[32px] bg-white px-3 pb-3 lg:flex lg:items-start"
      >
        {options.map((option) => {
          const isActive = option.value === active;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(option.value)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const i = options.findIndex((o) => o.value === active);
                const delta = event.key === "ArrowRight" ? 1 : -1;
                select(options[(i + delta + options.length) % options.length].value);
              }}
              className={cn(
                "flex h-12 w-[200px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[24px] px-6 transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2-01",
                isActive
                  ? "bg-brand-2-01 text-support-white"
                  : "text-brand-2-01 hover:bg-brand-2-01/5",
              )}
            >
              {option.icon && <Icon name={option.icon} className="size-4" />}
              <span className="text-base leading-6 font-semibold whitespace-nowrap">
                {option.label}
              </span>
              {option.badge && (
                <span className="flex h-6 min-w-12 shrink-0 items-center justify-center rounded-[24px] bg-brand-02 px-2 text-xs leading-4 font-bold uppercase text-brand-2-01">
                  {option.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {notch("right")}
    </div>
  );
}
