import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ContainerWidth = "default" | "narrow" | "full";

export type ContainerProps = {
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
  children?: ReactNode;
};

const WIDTH_CLASSES: Record<ContainerWidth, string> = {
  default: "max-w-[1512px] px-5 md:px-10 xl:px-[86px]",
  narrow: "max-w-[1512px] px-5 md:px-10 xl:px-[168px]",
  full: "max-w-none px-0",
};

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full", WIDTH_CLASSES[width], className)}>
      {children}
    </Tag>
  );
}
