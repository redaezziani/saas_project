'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard } from "lucide-react";
import useSWR from 'swr';
import {Home,Settings, Profile ,Logout} from '../dashbaord/globals/icons'
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
const UserAvatar =  () => {
  const { data: user, error } = useSWR('/api/user', fetcher);
   const Links = [
    {link: '/dashbaord', icon: <Home />},
    {link: '/profile', icon: <Profile />},
    {link: '/settings', icon: <Settings />},
   ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          className="cursor-pointer "
        >
         <AvatarImage
          src={user?.data?.image}
           alt={''} />
          <AvatarFallback
          className=" capitalize"
          >
            {user?.data?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent
      className=" border-slate-400/35 shadow-none"
      >
        <DropdownMenuLabel
        className="text-slate-700 text-sm font-medium"
        >
          {user?.data?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator
        className="bg-slate-400/35"
        />
        {Links.map((link, index) => (
          <DropdownMenuItem
          key={index}
          href={link}
          className="flex cursor-pointer transition-all ease-in-out duration-500 items-center gap-2 text-slate-500"
          >
            {link.icon}
            <span>{link.link.replace('/', '')}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator
        className="bg-slate-400/35"
        />
        <DropdownMenuItem
        href="/logout"
        className="flex cursor-pointer transition-all ease-in-out duration-500 items-center gap-2 text-red-500"
        >
          <Logout />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatar