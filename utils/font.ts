import { Manrope } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "arial"],
});
