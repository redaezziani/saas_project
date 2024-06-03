'use client';
import React from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



export const DatePicker = ({ onDateChange }: { onDateChange: (date: Date | undefined) => void }) => {
    const [date, setDate] = React.useState<Date>()
  
    React.useEffect(() => {
      // firts format the date to a string and then parse it back to a date object
      onDateChange(date ? new Date(date.toDateString()) : undefined)    
    }, [date, onDateChange])
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span></span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }