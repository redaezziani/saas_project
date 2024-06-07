import NavBar from "@/components/home/navbar";
import SearchBar from "@/components/dashbaord/globals/search-bar";
import { Toaster } from "@/components/ui/toaster"
import { Home } from "@/components/dashbaord/globals/icons";
import { GemIcon, HomeIcon, UsersRound } from "lucide-react";
import Sidebar from "@/components/dashbaord/globals/side-bar";
import PlanCard from '@/components/dashbaord/dashbaord/plan-card';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className=" w-full h-screen overflow-x-hidden grid grid-cols-11 gap-0 relative"
    >
      <Sidebar />
      <div className=" w-full bg-slate-100  col-span-11 md:col-span-9 relative overflow-x-hidden flex-col gap-3 justify-start items-start">
        <NavBar />
        <div className=" absolute z-[99] ">
      <PlanCard />
        <Toaster />
        </div>
        <SearchBar >
        {children}
        </SearchBar>

      </div>
    </section>
  );
}