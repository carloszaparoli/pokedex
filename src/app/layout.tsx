import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${roboto.variable} dark`}>
      <body className="dark:bg-bluewood-950 dark:text-bluewood-100 antialiased">
        <main className="max-w-[1024px] mx-auto py-0 md:py-4">{children}</main>
      </body>
    </html>
  );
}
