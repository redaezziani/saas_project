"use client"
import React from "react"
import { Button } from "../ui/button"
import { MoveRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
const ToasterTest = () => {
    const { toast } = useToast()
    const handelClick = () => {
        toast({
            variant: "success",
            title: " open toast",
            description: "the toast are opened",
        })
    }
    return (
        <Button
            variant={"outline"}
            onClick={() => handelClick()}
            className="flex items-center justify-center gap-2"
        >
            open <MoveRight className="w-3" />
        </Button>
    )
}

export default ToasterTest
