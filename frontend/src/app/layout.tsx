import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowDo - Smart Task Management",
  description: "Organize your life with FlowDo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-black pt-20 transition-colors">
          {children}
        </main>
      </body>
    </html>
  );
}
