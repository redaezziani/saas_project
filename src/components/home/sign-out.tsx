'use client';
import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react";
const SignOut = () => {
  return (
    <DropdownMenuItem
    className="flex gap-1 w-full justify-start items-center text-red-600"
    onClick={() => signOut()}
    >
          <LogOut size={16} />

        Sign Out
  </DropdownMenuItem>
  )
}

export default SignOut