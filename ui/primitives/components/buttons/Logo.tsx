import Image from "next/image";
import { cn } from "@/utils/cn";

export type LogoProps = {
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { width: 93, height: 32 },
  md: { width: 139, height: 48 },
} as const;

export function Logo({ size = "md", className, priority }: LogoProps) {
  const { width, height } = SIZES[size];
  return (
    <Image
      src="/Logo-v2.svg"
      alt="Qtable"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ width, height }}
    />
  );
}
