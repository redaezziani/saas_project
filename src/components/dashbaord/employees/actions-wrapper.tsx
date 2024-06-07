'use client';

import { Button } from "@/components/ui/button"
import { mutate } from 'swr';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  OptionsIcon } from "./icons"
import {  Edit3, Ellipsis, Trash } from "lucide-react"
import axios from "axios";

interface ActionsProps {
  id: string
}

export function ActionsWrapper({ id }: { ActionsProps }) {
  const handelDelete = async () => {
    try {
      const res = await fetch(`/api/admin/employees/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        mutate('/api/admin/employees'); 
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className=" focus:outline-none focus-within:outline-none "
        asChild>
        <button
          className=" w-14 flex justify-center"
        >
          <Ellipsis
            className="text-slate-500 size-4"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 border-slate-400/35 shadow-none">
        <DropdownMenuLabel
          className="text-slate-700 text-sm font-medium"
        >
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator
          className="bg-slate-400/35"
        />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex cursor-pointer transition-all ease-in-out duration-500 items-center gap-2 text-slate-500"
          >

            <div className="flex gap-2 justify-start items-center">
              <Edit3
              size={16}
              />
              Edit
            </div>
            <DropdownMenuShortcut>
              ⌘E
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer transition-all ease-in-out duration-500 items-center gap-2 text-red-500"
          >

            <div
              onClick={handelDelete}
              className="flex gap-2 justify-start items-center">
              <Trash
              size={16}
              
              />
              Delete
            </div>
            <DropdownMenuShortcut>
              ⌘D
            </DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
