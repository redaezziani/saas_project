"use client"
import { Button } from "@/components/ui/button"
import MobileNavBar from "./mobile-nav-bar"
import UserAvatar from "./user-avatar"
import { Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search, SearchSlashIcon } from "lucide-react"

const NavBar = () => {
    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-border bg-transparent bg-white px-4 py-2 backdrop-blur-md">
            <div className="flex items-center justify-start gap-3">
                <img className="h-6 w-6" src="/saas-logo.png" alt="icon" />
                <h1 className="text-md font-bold text-slate-800">
                    Talent <span className="text-primary">Track</span>
                </h1>
            </div>
            <div className="relative hidden w-full max-w-lg items-center justify-start md:flex">
                <Search className="absolute right-3 h-5 w-5 text-slate-400" />
                <Input placeholder=" search for somthing..." />
            </div>
            <div className="flex items-center justify-start gap-3">
                <div className="hidden md:flex"></div>
                <Button variant="icon" className="text-slate-500">
                    <Bell size={18} />
                </Button>
                <UserAvatar />
                <div className="flex items-center justify-end gap-4 md:hidden">
                    <MobileNavBar />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
