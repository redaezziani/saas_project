import NavBar from "@/components/home/navbar";
import SearchBar from "@/components/dashbaord/globals/search-bar";
import { Toaster } from "@/components/ui/toaster"
import { Home } from "@/components/dashbaord/globals/icons";
import { GemIcon, HomeIcon, UsersRound } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className=" w-full h-screen overflow-x-hidden grid grid-cols-11 gap-0 relative"
    >
      <div className=" border-r  border-border w-full md:flex justify-start items-start gap-3 flex-col hidden col-span-2 h-screen sticky bg-white z-20">
        <hr
          className="border-dashed p-1 mt-14 w-full border-t border-border"
         />
         <div className="w-full font-semibold mt-10  px-3 text-slate-500 flex justify-start items-center gap-2">
         
          Dashbaord 
         </div>
         <div className="px-3">
         <div className=" flex  px-3 pl-6 mt-4 gap-6 border-l border-slate-400/35   flex-col justify-start items-start">
         <div className="w-full text-sm cursor-pointer   px-3 text-slate-500 flex justify-start items-center gap-2">
          <UsersRound
          className=" size-4"
          />
          Emplyoees
          </div>
         <div className="w-full text-sm   px-3 text-slate-500 flex justify-start items-center gap-2">
          <GemIcon 
          className=" size-4"
          />
          Factures 
          </div>
         </div>
         </div>
      </div>
      <div className=" w-full bg-slate-50  col-span-11 md:col-span-9 relative overflow-x-hidden flex-col gap-3 justify-start items-start">
        <NavBar />
        <div className=" absolute z-50 ">
        <Toaster />

        </div>
        <SearchBar >
        {children}
        </SearchBar>

      </div>
    </section>
  );
}