import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sycamore Hospital Management",
  description: "Système de gestion hospitalière",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
        <footer className="fixed bottom-0 w-full bg-gray-100 py-2 text-center text-sm text-gray-600">
          © 2024 Gad Ntenta. Porfolio : https://gadntenta.vercel.app/
        </footer>
      </body>
    </html>
  );
}
