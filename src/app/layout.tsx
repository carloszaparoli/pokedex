import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Pokédex",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <body className="dark:bg-bluewood-950 bg-gray-100 antialiased transition-colors duration-300">
        <ThemeProvider defaultTheme="dark" attribute="class">
          <main className="mx-auto max-w-[1024px] py-0 md:py-4">
            <Header />
            <Suspense>{children}</Suspense>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
