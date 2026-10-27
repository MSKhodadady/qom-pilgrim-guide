import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const font = Vazirmatn({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "سامانه راهنمایی زائرین قم",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("h-full", "antialiased", "font-sans", font.variable)}
    >
      <body className="min-h-full flex flex-col">
        <main className="mx-auto max-w-6xl pt-12 w-full flex flex-col items-center gap-6 p-1">
          {children}
        </main>
      </body>
    </html>
  );
}
