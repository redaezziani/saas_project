import NavBar from "@/components/home/navbar"
import SearchBar from "@/components/dashbaord/globals/search-bar"
import { Toaster } from "@/components/ui/toaster"
import { Home } from "@/components/dashbaord/globals/icons"
import { GemIcon, HomeIcon, UsersRound } from "lucide-react"
import Sidebar from "@/components/dashbaord/globals/side-bar"
import PlanCard from "@/components/dashbaord/dashbaord/plan-card"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="relative grid h-screen w-full grid-cols-11 gap-0 overflow-x-hidden">
            <Sidebar />
            <div className="relative bg-neutral-50 col-span-11 w-full flex-col items-start justify-start gap-3 overflow-x-hidden md:col-span-9">
                <NavBar />
                <div className="absolute z-[99]">
                    <PlanCard />
                    <Toaster />
                </div>
                <SearchBar>{children}</SearchBar>
            </div>
        </section>
    )
}
