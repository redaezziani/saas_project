import NavBar from "@/components/home/navbar";
import SearchBar from "@/components/dashbaord/globals/search-bar";
import { Toaster } from "@/components/ui/toaster"





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className=" w-full h-screen overflow-x-hidden grid grid-cols-11 gap-0 relative"
    >
      <div className=" border-r border-border w-full md:block hidden col-span-2 h-screen sticky bg-white z-20">
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