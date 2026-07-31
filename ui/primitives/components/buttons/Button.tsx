import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "./Icon";
import type { IconName } from "@/utils/icons";

export type ButtonVariant = "primary" | "outline" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  trailingIcon?: IconName | (string & {});
  leadingIcon?: IconName | (string & {});
  iconClassName?: string;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

export type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-brand-02 text-brand-2-01 hover:brightness-95",
  outline:
    "border border-line-02 text-brand-2-01 hover:border-brand-2-01",
  dark: "bg-brand-2-01 text-support-white hover:brightness-110",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-10 gap-1.5 px-4 text-sm leading-5",
  md: "h-12 gap-1.5 px-5 text-base leading-6",
  lg: "h-[60px] gap-2 px-8 text-base leading-6",
};

const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-6",
};

export function Button({
  variant = "primary",
  size = "md",
  trailingIcon,
  leadingIcon,
  fullWidth,
  className,
  iconClassName,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[80px] font-bold whitespace-nowrap transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2-01",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} className={cn(ICON_SIZE[size], iconClassName)} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} className={cn(ICON_SIZE[size], iconClassName)} />}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
