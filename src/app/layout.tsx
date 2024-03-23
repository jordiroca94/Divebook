import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { EdgeStoreProvider } from "../../lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diverbook",
  description:
    "DiverBook is a place to discover and share the best places for diving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
