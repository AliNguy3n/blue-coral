import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "./Icon";
import type { IconName } from "@/utils/icons";

export type IconButtonVariant = "ghost" | "outline" | "tint" | "primary" | "dark";
export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonRadius = "full" | "8";

type CommonProps = {
  icon: IconName | (string & {});
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  radius?: IconButtonRadius;
  className?: string;
  iconClassName?: string;
};

export type IconButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  );

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  ghost: "text-brand-2-01 hover:bg-brand-2-01/5",
  outline: "border border-line-02 text-brand-2-01 hover:border-brand-2-01",
  tint: "border-[length:0.5px] border-line-01 bg-bg-05 text-brand-2-01 mix-blend-multiply",
  primary: "bg-brand-02 text-brand-2-01 hover:brightness-95",
  dark: "bg-brand-2-01 text-support-white hover:brightness-110",
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "size-7",
  md: "size-10",
  lg: "size-12",
};

const RADIUS_CLASSES: Record<IconButtonRadius, string> = {
  full: "rounded-full",
  "8": "rounded-[8px]",
};

const ICON_SIZE: Record<IconButtonSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "sm",
  radius = "full",
  className,
  iconClassName,
  ...rest
}: IconButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2-01",
    "disabled:pointer-events-none disabled:opacity-50",
    RADIUS_CLASSES[radius],
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  const glyph = <Icon name={icon} className={cn(ICON_SIZE[size], iconClassName)} />;

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} aria-label={label} className={classes} {...anchorProps}>
        {glyph}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} aria-label={label} className={classes} {...buttonProps}>
      {glyph}
    </button>
  );
}
