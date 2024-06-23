"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard } from "lucide-react"
import useSWR from "swr"
import { Home, Settings, Profile, Logout } from "../dashbaord/globals/icons"
import { LogOut } from "@/(auth)/lib/auth"
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json())
const UserAvatar = () => {
    const { data: user, error } = useSWR("/api/user", fetcher)
    const Links = [
        { link: "/dashbaord", icon: <Home /> },
        { link: "/profile", icon: <Profile /> },
        { link: "/settings", icon: <Settings /> },
    ]

    const handelLogOut = async () => {
        await LogOut()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.data?.image} alt={""} />
                    <AvatarFallback className="capitalize">
                        {user?.data?.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-slate-400/35 shadow-none">
                <DropdownMenuLabel className="text-sm font-medium text-slate-700">
                    {user?.data?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-400/35" />
                {Links.map((link, index) => (
                    <DropdownMenuItem
                        key={index}
                        href={link}
                        className="flex cursor-pointer items-center gap-2 text-slate-500 transition-all duration-500 ease-in-out"
                    >
                        {link.icon}
                        <span>{link.link.replace("/", "")}</span>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-slate-400/35" />
                <DropdownMenuItem
                    onClick={handelLogOut}
                    className="flex cursor-pointer items-center gap-2 text-red-500 transition-all duration-500 ease-in-out focus:bg-red-500/10 focus:text-red-500 data-[state=open]:bg-red-500/20"
                >
                    <Logout />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar
