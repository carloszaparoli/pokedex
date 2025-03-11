import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "next-themes";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Pokédex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </head>
      <body className="bg-gray-100 dark:bg-bluewood-950 antialiased transition-colors duration-300">
        <ThemeProvider attribute="class">
          <main className="max-w-[1024px] mx-auto py-0 md:py-4">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
