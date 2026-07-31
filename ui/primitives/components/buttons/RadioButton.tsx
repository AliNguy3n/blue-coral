"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "./Icon";
import { useListboxDropdown } from "./useListboxDropdown";
import type { IconName } from "@/utils/icons";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  icon?: IconName | (string & {});
};

export type RadioButtonProps = {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  progress?: number;
  className?: string;
  "aria-label"?: string;
};

export function RadioButton({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  progress = 50 / 120,
  className,
  "aria-label": ariaLabel = "Chọn mô hình kinh doanh",
}: RadioButtonProps) {
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

  return (
    <div className={cn("w-full", className)}>
      <div className="md:hidden">
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
              "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-[60px] bg-white px-3",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2-01",
            )}
          >
            <span className="min-w-0 flex-1 truncate text-left text-sm leading-5 text-brand-2-01">
              {activeOption?.label}
            </span>
            <Icon
              name="chevronDown"
              className={cn(
                "size-4 text-brand-2-01 transition-transform",
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
              className="absolute top-full left-0 z-20 mt-2.5 flex w-full flex-col gap-1 rounded-[20px] bg-white p-2.5 shadow-dropdown"
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
                      "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-[20px] px-3 text-left transition-colors",
                      "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-2-01",
                      isActive
                        ? "bg-brand-2-01 text-support-white"
                        : "text-brand-2-01 hover:bg-brand-2-01/5",
                    )}
                  >
                    {option.icon && <Icon name={option.icon} className="size-4" />}
                    <span className="min-w-0 flex-1 truncate text-sm leading-5">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {activeOption && (
          <div className="mt-4 flex flex-col gap-1 text-brand-2-01">
            <p className="text-2xl leading-[34px] font-bold">{activeOption.label}</p>
            {activeOption.description && (
              <p className="text-sm leading-5">{activeOption.description}</p>
            )}
          </div>
        )}
      </div>

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="hidden h-full flex-col border-l border-line-01 md:flex md:gap-4 lg:gap-6 xl:gap-10"
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
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                event.preventDefault();
                const i = options.findIndex((o) => o.value === active);
                const delta = event.key === "ArrowDown" ? 1 : -1;
                select(options[(i + delta + options.length) % options.length].value);
              }}
              className={cn(
                "relative flex w-full cursor-pointer flex-col items-start text-left text-brand-2-01",
                "md:pl-6 lg:pl-8 xl:pl-10",
                isActive
                  ? "md:grow md:justify-center"
                  : "opacity-90 transition-opacity hover:opacity-100",
              )}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-1/2 h-1/2 w-[3px] -translate-y-1/2 overflow-hidden rounded-[80px] bg-track figma:top-[73px] figma:h-[120px] figma:translate-y-0"
                >
                  <span
                    className="block w-full rounded-[80px] bg-track-fill transition-[height] duration-300"
                    style={{ height: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
                  />
                </span>
              )}

              <span className="flex w-full flex-col gap-2">
                <span
                  className={cn(
                    "w-full font-bold",
                    isActive
                      ? "md:text-[24px] lg:text-[28px] xl:text-[32px] figma:text-[36px]"
                      : "md:text-[16px] lg:text-[18px] xl:text-[20px]",
                    "leading-[1.4]",
                  )}
                >
                  {option.label}
                </span>
                {isActive && option.description && (
                  <span className="w-full font-normal md:text-sm md:leading-5 xl:text-base xl:leading-7">
                    {option.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
