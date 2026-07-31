import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Container, type ContainerWidth } from "./Container";

export type SectionTone = "transparent" | "cream" | "dark";

export type SectionProps = {
  as?: ElementType;
  tone?: SectionTone;
  container?: ContainerWidth | false;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
};

const TONE_CLASSES: Record<SectionTone, string> = {
  transparent: "",
  cream: "bg-bg-05 text-brand-2-01",
  dark: "bg-brand-2-01 text-support-white",
};

export function Section({
  as: Tag = "section",
  tone = "transparent",
  container = "default",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative w-full py-[60px] lg:py-[120px]",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {container === false ? (
        children
      ) : (
        <Container width={container} className={containerClassName}>
          {children}
        </Container>
      )}
    </Tag>
  );
}
