import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "nexsus",
  description: "Saas Image to Text Converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className={"w-full flex bg-white flex-col gap-3 h-screen overflow-hidden relative justify-start  items-center"}>
       
        {children}
      </main>
  );
}