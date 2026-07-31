import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { ICONS, type IconName } from "@/utils/icons";

export type IconProps = {
  name: IconName | (string & {});
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, className, style }: IconProps) {
  const src = name in ICONS ? ICONS[name as IconName] : name;
  const mask = `url("${src}") center / contain no-repeat`;

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-4 shrink-0 bg-current", className)}
      style={{ mask, WebkitMask: mask, ...style }}
    />
  );
}
