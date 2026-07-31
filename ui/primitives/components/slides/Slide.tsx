"use client";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

export type SlideProps = {
  children: ReactNode;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showPagination?: boolean;
  className?: string;
  viewportClassName?: string;
  "aria-label"?: string;
};

export function Slide({
  children,
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  autoPlay = false,
  interval = 5000,
  loop = true,
  showPagination = true,
  className,
  viewportClassName,
  "aria-label": ariaLabel = "Slide",
}: SlideProps) {
  const slides = Children.toArray(children);
  const count = slides.length;

  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const isControlled = controlledIndex !== undefined;
  const active = Math.min(isControlled ? controlledIndex : uncontrolledIndex, Math.max(count - 1, 0));

  const groupId = useId();
  const paused = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const bounded = loop
        ? (next + count) % count
        : Math.max(0, Math.min(next, count - 1));
      if (!isControlled) setUncontrolledIndex(bounded);
      onIndexChange?.(bounded);
    },
    [count, loop, isControlled, onIndexChange],
  );

  useEffect(() => {
    if (!autoPlay || count < 2) return;
    const id = window.setInterval(() => {
      if (!paused.current) goTo(active + 1);
    }, interval);
    return () => window.clearInterval(id);
  }, [autoPlay, count, interval, active, goTo]);

  if (count === 0) return null;

  return (
    <div
      className={cn("relative w-full", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(active - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(active + 1);
        }
      }}
    >
      <div className={cn("w-full overflow-hidden", viewportClassName)}>
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full shrink-0 grow-0 basis-full"
              role="tabpanel"
              id={`${groupId}-panel-${i}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== active}
              inert={i !== active ? true : undefined}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showPagination && count > 1 && (
        <div
          className="flex items-center justify-center gap-2 py-5 h-1"
          role="tablist"
          aria-label={`${ariaLabel} pagination`}
        >
          {slides.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${groupId}-panel-${i}`}
                aria-label={`${i + 1} / ${count}`}
                onClick={() => goTo(i)}
                className="group cursor-pointer py-2"
              >
                <span
                  className={cn(
                    "block transition-all duration-300",
                    isActive
                      ? "h-1 w-[60px] bg-brand-2-01"
                      : "h-0.5 w-6 bg-muted group-hover:bg-brand-2-01/40",
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
