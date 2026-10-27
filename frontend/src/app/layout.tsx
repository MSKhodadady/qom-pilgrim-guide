import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Image from "next/image";
import logo from "../assets/logo-with-text.png";

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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="راهنمای زائر" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-full flex flex-col">
        <main className="mx-auto max-w-6xl pt-12 w-full flex flex-col items-center gap-6 p-1">
          <h1 className="flex justify-between items-center border rounded-xl border-slate-300 p-4 w-full">
            <span className="text-3xl">سامانه راهنمایی زائر</span>
            <Image src={logo} alt="logo" className="h-14 w-auto" />
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
