import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";



export const metadata: Metadata = {
  title: "Talent Track",
  description: "A Next.js starter styled with Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("w-full flex bg-white flex-col gap-3 min-h-screen relative justify-start  items-center")}>
        
        {children}
      </body>
    </html>
  );
}