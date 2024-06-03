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

export function ActionsWrapper() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      className=" focus:outline-none focus-within:outline-none "
      asChild>
        <button
        >
            <OptionsIcon />
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

             <div className="flex gap-1 justify-start items-center">
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
