import NavBar from "@/components/home/navbar";
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
      <section
      className=" w-full h-screen overflow-x-hidden grid grid-cols-9 gap-0 relative"
      >
        <div className=" border-r border-border w-full md:block hidden col-span-2 h-screen sticky bg-white z-20">
        </div>
       <div className=" w-full bg-slate-100  col-span-9 md:col-span-7 relative overflow-x-hidden flex-col gap-3 justify-start items-start">
       <NavBar />
       <div className=" absolute z-50 ">
       </div>
       {children}
       </div>
      </section>
  );
}