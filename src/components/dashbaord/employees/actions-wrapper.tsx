'use client';

import { Button } from "@/components/ui/button"
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
import { DeleteIcon, EditIcon, OptionsIcon } from "./icons"
import { Ellipsis } from "lucide-react"
import axios from "axios";
import { DeleteEmployee } from "@/(auth)/actions";

interface ActionsProps {
  id: string
}

export function ActionsWrapper({ id }: { ActionsProps }) {
  const handelDelete = async () => {
    try {
      const res = await DeleteEmployee(id)
      if (res){
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

            <div className="flex gap-1 justify-start items-center">
              <EditIcon />
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
              className="flex gap-1 justify-start items-center">
              <DeleteIcon />
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
