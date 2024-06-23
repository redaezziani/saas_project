"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
const SignOut = () => {
    return (
        <DropdownMenuItem
            className="flex w-full items-center justify-start gap-1 text-red-600"
            onClick={() => signOut()}
        >
            <LogOut size={16} />
            Sign Out
        </DropdownMenuItem>
    )
}

export default SignOut
