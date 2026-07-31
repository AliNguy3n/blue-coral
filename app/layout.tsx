import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { manrope } from "@/utils/font";
import { Header } from "@/ui";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qtable — Quản lý dễ dàng, bán hàng hiệu quả",
    template: "%s | Qtable",
  },
  description:
    "Giải pháp quản lý nhà hàng, quán cà phê và bán lẻ: order nhanh, tăng hiệu suất bếp và giữ chân khách hàng — tất cả trong một nền tảng.",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-2-01">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
