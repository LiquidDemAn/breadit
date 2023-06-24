import "@/styles/globals.css";
import { cn } from "@/configs/utils";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";

export const metadata = {
  title: "Breadit App",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900 ", inter.className)}>
      <body className="min-h-screen pt-12 bg-slate-50 ">
        <Navbar />
        <main className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </main>

        <Toaster />
      </body>
    </html>
  );
}
