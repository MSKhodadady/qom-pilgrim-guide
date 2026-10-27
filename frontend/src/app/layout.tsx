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
          <h1 className="flex justify-between items-center border rounded-xl border-slate-300 p-4 w-full">
            <span className="text-3xl">شهرداری قم</span>
            <span className="text-3xl">سامانه راهنمایی زائر</span>
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
