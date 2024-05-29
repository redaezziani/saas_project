import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/auth";
import SignOut from "@/components/home/sign-out";
import { CreditCard } from "lucide-react";

const UserAvatar = async () => {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          className="cursor-pointer "
        >
          {session && (<AvatarImage src={session.user.image} alt={session.user.name} />)}
          <AvatarFallback>
            {session && session.user.name[0]}
          </AvatarFallback>
        </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1 w-full justify-start items-center">
          <CreditCard size={16} />
          Billing
        </DropdownMenuItem>
          <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatar