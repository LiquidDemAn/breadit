import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { ReactNode } from "react";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Breadit App",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  authModal,
}: {
  children: ReactNode;
  authModal: ReactNode;
}) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900", inter.className)}>
      <body className="min-h-screen pt-12 bg-slate-50">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />

          {authModal}

          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
